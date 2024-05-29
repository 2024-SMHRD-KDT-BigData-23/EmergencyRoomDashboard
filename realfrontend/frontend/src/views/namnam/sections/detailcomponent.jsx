import React from "react";
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import SeverityChart from './severitychart';
import '../../../assets/scss/detail.scss';

const PatientDetail = () => {
    // 예시 데이터
    const patient = {
        name: '홍길동',
        age: 35,
        gender: 'male',
        height: 181,
        weight: 82,
        hospitalizationDay: '2023.05.16',
        dischargeExpectedDay: '2024.02.17',
        status: '입원 중',
        heartRate: 88,
        spo2: 97,
        respirationRate: 13,
        temperature: 37.2,
        riskIndex: 77,
        suggestPosition: 'ICU'
    };

    return (
        <div id="main-wrapper">
            <div className="page-wrapper">
                <div className="container-fluid">
                    <Container>
                        <Row>
                            <Col lg="12" md="12" className="text-center mb-4">
                                <h2 className="title">환자 상세 정보</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="6" md="12">
                                <Card className="patient-card">
                                    <CardBody>
                                        <h3>{patient.name} {patient.age}세</h3>
                                        <p>성별: {patient.gender}</p>
                                        <p>키: {patient.height} cm</p>
                                        <p>체중: {patient.weight} kg</p>
                                        <p>입원일: {patient.hospitalizationDay}</p>
                                        <p>퇴원예정일: {patient.dischargeExpectedDay}</p>
                                        <p>상태: {patient.status}</p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" md="12">
                                <Card className="risk-card">
                                    <CardBody>
                                        <h3>위험도 지수</h3>
                                        <p>심박수: {patient.heartRate} BPM</p>
                                        <p>산소포화도: {patient.spo2} %</p>
                                        <p>호흡수: {patient.respirationRate} BPM</p>
                                        <p>체온: {patient.temperature} °C</p>
                                        <p>위험도: {patient.riskIndex}</p>
                                        <p>추천 위치: {patient.suggestPosition}</p>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row className="info-section">
                            <Col className="info-box">
                                <h4>체온</h4>
                                <p>{patient.temperature}°C</p>
                            </Col>
                            <Col className="info-box">
                                <h4>환자 고통정도</h4>
                                <p>62</p>
                            </Col>
                            <Col className="info-box">
                                <SeverityChart />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="12" md="12" className="text-center mt-4">
                                <div className="risk-info">
                                    <div>
                                        <h4>PREDICTION RISK : <span className="risk-index">{patient.riskIndex}</span></h4>
                                        <p className="suggest-position">Suggest Position : {patient.suggestPosition}</p>
                                    </div>
                                    <div className="risk-levels">
                                        <p style={{ color: 'green' }}>• 위험도 낮음 : 10~30</p>
                                        <p style={{ color: 'orange' }}>• 위험도 중간 : 31~69</p>
                                        <p style={{ color: 'red' }}>• 위험도 높음 : 70~100</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default PatientDetail;
