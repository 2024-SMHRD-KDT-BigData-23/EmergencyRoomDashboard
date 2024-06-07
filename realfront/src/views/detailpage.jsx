import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import axios from 'axios';
import { Container, Row } from "react-bootstrap";
import Header from '../components/core/header';
import PatientInfo from './sections/PatientInfo';
import VitalChart from './sections/VitalChart';
import AdmissionInfo from './sections/AdmissionInfo';

const Detail = () => {

    const { patientId, admissionId } = useParams();
    const [patientData, setPatientData] = useState([]);
    const [admissionList, setAdmissionList] = useState([]);

    // Timestamp 형식의 데이터를 "년/월/일/시/분/초"로 쪼개주는 함수
    const extraDateAndTime = (timestamp) => {
        const date = new Date(timestamp);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
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

    // 서버와 통신을 통해 환자의 상세 정보 가져오기
    useEffect(() => {
        axios.get(`http://localhost:8080/api/ER/patient-details/${admissionId}`)
            .then(response => {
                const formattedData = response.data.map(item => ({
                    ...item,
                    admissionInTime: extraDateAndTime(item.admissionInTime),
                    admissionOutTime: extraDateAndTime(item.admissionOutTime),
                    patientVitalCreatedAt: extraDateAndTime(item.patientVitalCreatedAt)
                }));
                console.log("환자 상세 정보 : ", formattedData);
                setPatientData(formattedData);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });

        axios.get(`http://localhost:8080/api/ER/search/patient-name-id/${patientId}`)
            .then(response => {
                console.log("환자의 다른 입실 정보 : ", response.data);
                setAdmissionList(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [admissionId, patientId]);

    return (
        <>
            <Header />
            <Container fluid className="p-4 bg-light">
                <Row className="h-100">
                    <PatientInfo patientData={patientData} admissionList={admissionList} patientId={patientId} admissionId={admissionId} />
                    <VitalChart patientData={patientData} />
                    <AdmissionInfo patientData={patientData} />
                </Row>
            </Container >
        </>
    );
}

Detail.propTypes = {
    classes: PropTypes.object
};

export default Detail;