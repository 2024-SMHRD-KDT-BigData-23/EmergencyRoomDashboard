import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import AdminHeader from '../../components/core/adminheader';
import Suveillance from './sections/suveillance';
import Footer from '../../components/core/footer';
import axios from 'axios';

const SuveillancePage = () => {

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



    const [patients, setPatients] = useState([]);
    const [search, setSearch] = useState([]);

    useEffect(() => {

        axios
        .get(`http://localhost:8080/api/resultWardLog`)
        .then(response => {
        const formattedData = response.data.map(item => ({
            ...item,
            admissionInTime : extraDateAndTime(item.admissionInTime),
            admissionOutTime : extraDateAndTime(item.admissionOutTime),
            patientVitalCreatedAt : extraDateAndTime(item.patientVitalCreatedAt)
        }));
        setPatients(formattedData);
        })
        .catch((error) => {
            console.error('Error fetching data : ', error);
        });
        
    }, []);

    useEffect(()=>{
        axios
        .get(`http://localhost:8080/api/search`,{param:search})
    })

    return (
        <div>
            <AdminHeader />
            <Container>
                <Suveillance patients = { patients } setSearch = {setSearch} />
            </Container>
            <Footer/>
        </div>
    );

};

export default SuveillancePage;
