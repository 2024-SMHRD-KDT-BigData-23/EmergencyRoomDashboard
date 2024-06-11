    import React, { useEffect, useState } from 'react';
    import { Container } from 'react-bootstrap';
    import { useLocation } from 'react-router-dom';
    import AdminHeader from '../../components/core/adminheader';
    import Surveillance from './sections/surveillance.jsx';
    import Footer from '../../components/core/footer';
    import axios from 'axios';

    const SurveillancePage = () => {

        // Timestamp 형식의 데이터를 "년/월/일/시/분/초"로 쪼개주는 함수
        const extraDateAndTime = (timestamp) => {
        if (timestamp !== null) {
            const date = new Date(timestamp);

            const year = String(date.getFullYear()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hour = String(date.getHours()).padStart(2, '0');
            const minute = String(date.getMinutes()).padStart(2, '0');
            const second = String(date.getSeconds()).padStart(2, '0');

            return {
                year,
                month,
                day,
                hour,
                minute,
                second
            };
        } else {
            return timestamp;
        }
    }




        const [patient, setPatient] = useState([]);
        // const [loginList, setLoginList] = useState([]);
        const [search, setSearch] = useState([]);


        useEffect(() => {
                axios
                    .get('http://localhost:8080/api/log')
                    .then(response => {
                        const formattedData = response.data.map(item => ({
                            ...item,
                            logTime: extraDateAndTime(item.logTime)
                        }));
                        setPatient(formattedData);
                    })
                    .catch(error => {
                        console.error("Error fetching search data: ", error);
                    });
        }, []);

        useEffect(()=>{
            
            // outTimeEnd가 존재할시 1일 더해주기
            const nextDay = search.logTimeEnd ? new Date(new Date(search.logTimeEnd).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] : '';

            axios
            .get(`http://localhost:8080/api/log/search`,{
                params:{
                    logUser: search.logUser,
                    logAction: search.logAction,
                    logTimeStart: search.logTimeStart,
                    logTimeEnd: nextDay
                }})
            .then(response => {
                const formattedData = response.data.map(item => ({
                    ...item,
                    logTime : extraDateAndTime(item.logTime),
                }));
                setPatient(formattedData);
                })
            .catch(error => {
                console.error('Error fetching search data: ', error);
            });
        }, [search])

        

        return (
            <div>
                <AdminHeader />
                <Container className='adminBody'>
                    <Surveillance patient = { patient } setSearch = {setSearch} />
                </Container>
                <Footer/>
            </div>
        );

    };

    export default SurveillancePage;
