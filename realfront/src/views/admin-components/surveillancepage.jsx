    import React, { useEffect, useState } from 'react';
    import { Container } from 'react-bootstrap';
    import { useLocation } from 'react-router-dom';
    import AdminHeader from '../../components/core/adminheader';
    import Surveillance from './sections/surveillance.jsx';
    import Footer from '../../components/core/footer';
    import axios from 'axios';

    const SurveillancePage = () => {

        // Timestamp 형식의 데이터를 "년/월/일/시/분/초"로 쪼개주는 함수
        const extraDateAndTime = (timeStamp) => {
            const date = new Date(timeStamp);

            const year = date.getFullYear();
            const month = date.getMonth() +1;
            const day = date. getDate();
            const hour = date.getHours();
            const minute = date.getMinutes();
            const second = date.getSeconds();

            return {
                year,
                month,
                day,
                hour,
                minute,
                second
            };
        } 




        const [resultWardList, setResultWardList] = useState([]);
        // const [loginList, setLoginList] = useState([]);
        const [search, setSearch] = useState([]);

        const [page, setPage] = useState('login');

        const handlePageChange = (selectedPage) => {
            setPage(selectedPage);
        };

        console.log('page값1 : ',page)

        useEffect(() => {
            if (page === 'login') {
                console.log("login들어옴")
                axios
                    .get('http://localhost:8080/api/user-activity')
                    .then(response => {
                        const formattedData = response.data.map(item => ({
                            ...item,
                            activityDate: extraDateAndTime(item.activityDate)
                        }));
                        setResultWardList(formattedData);
                    })
                    .catch(error => {
                        console.error("There was an error fetching user activities!", error);
                    });
            } else if (page === 'resultWard') {
                console.log("resultWard들어옴")
                axios
                    .get('http://localhost:8080/api/resultWardLog')
                    .then(response => {
                        const formattedData = response.data.map(item => ({
                            ...item,
                            resultWardUpdatedAt: extraDateAndTime(item.resultWardUpdatedAt)
                        }));
                        setResultWardList(formattedData);
                    })
                    .catch(error => {
                        console.error('Error fetching data : ', error);
                    });
            }
        }, [page]);

        useEffect(()=>{
            
            // outTimeEnd가 존재할시 1일 더해주기
            const nextDay = search.OutTimeEnd ? new Date(new Date(search.OutTimeEnd).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] : '';

            axios
            .get(`http://localhost:8080/api/search`,{
                params:{
                    staffId: search.staffId,
                    ResultWard: search.ResultWard,
                    OutTimeStart: search.OutTimeStart,
                    OutTimeEnd: nextDay
                }})
            .then(response => {
                const formattedData = response.data.map(item => ({
                    ...item,
                    resultWardUpdatedAt : extraDateAndTime(item.resultWardUpdatedAt),
                }));
                setResultWardList(formattedData);
                })
            .catch(error => {
                console.error('Error fetching search data: ', error);
            });
        }, [search])

        console.log('page값2 : ',page)

        

        return (
            <div>
                <AdminHeader />
                <Container>
                    <Surveillance resultWardList = { resultWardList } setSearch = {setSearch} handlePageChange = {handlePageChange} page = {page} />
                </Container>
                <Footer/>
            </div>
        );

    };

    export default SurveillancePage;
