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
    const [resultWardList, setResultWardList] = useState([]);
    const [commentList, setCommentList] = useState([]);
    const [resultWard, setResultWard] = useState('');
    const [comment, setComment] = useState('');
    const [selectedPointIndex, setSelectedPointIndex] = useState(null);

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

    // 서버와 통신을 통해 환자의 상세 정보 가져오기
    useEffect(() => {
        Promise.all([
            axios.get(`http://3.144.162.188:8080/api/ER/patient-details/${admissionId}`),
            axios.get(`http://3.144.162.188:8080/api/ER/search/patient-name-id/${patientId}`),
            axios.get(`http://3.144.162.188:8080/api/ER/resultWards/${admissionId}`),
            axios.get(`http://3.144.162.188:8080/api/ER/comments/${admissionId}`)
        ])
            .then(([patientDetailsResponse, patientNameIdResponse, resultWardsResponse, commentsResponse]) => {
                const patientData = patientDetailsResponse.data.map(item => ({
                    ...item,
                    admissionInTime: extraDateAndTime(item.admissionInTime),
                    admissionOutTime: extraDateAndTime(item.admissionOutTime),
                    patientVitalCreatedAt: extraDateAndTime(item.patientVitalCreatedAt)
                }));

                const admissionList = patientNameIdResponse.data.map(item => ({
                    ...item,
                    admissionInTime: extraDateAndTime(item.admissionInTime),
                    admissionOutTime: extraDateAndTime(item.admissionOutTime),
                    patientVitalCreatedAt: extraDateAndTime(item.patientVitalCreatedAt)
                }));

                const resultWardList = resultWardsResponse.data.map(item => ({
                    ...item,
                    resultWardUpdatedAt: extraDateAndTime(item.resultWardUpdatedAt)
                }));

                const commentList = commentsResponse.data.map(item => ({
                    ...item,
                    commentUpdatedAt: extraDateAndTime(item.commentUpdatedAt)
                }));

                setPatientData(patientData);
                setSelectedPointIndex(patientData.length - 1);
                console.log("patientData : ", patientData);
                setAdmissionList(admissionList);
                console.log("admissonList : ", admissionList);
                setResultWardList(resultWardList);
                console.log("resultWardList : ", resultWardList);
                setCommentList(commentList);
                console.log("commentList : ", commentList);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [admissionId, patientId, resultWard, comment]);

    return (
        <>
            <Header />
            <Container fluid className="p-3">
                <Row className="h-100 g-3">
                    <PatientInfo patientData={patientData} />
                    <VitalChart patientData={patientData} selectedPointIndex={selectedPointIndex} setSelectedPointIndex={setSelectedPointIndex} />
                    <AdmissionInfo patientData={patientData} admissionList={admissionList} patientId={patientId} admissionId={admissionId} selectedPointIndex={selectedPointIndex} resultWardList={resultWardList} commentList={commentList} resultWard={resultWard} setResultWard={setResultWard} comment={comment} setComment={setComment} />
                </Row>
            </Container >
        </>
    );
}

Detail.propTypes = {
    classes: PropTypes.object
};

export default Detail;