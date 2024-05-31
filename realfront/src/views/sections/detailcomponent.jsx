import menuWhite from '../../assets/images/menuwhite.png';
import menu from '../../assets/images/menu.png';
import '../../assets/scss/currentpage.scss';

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Navbar, Nav, Offcanvas, Button, Dropdown, Container, Row, Col, Table } from 'react-bootstrap';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

const DetailComponent = () => {
    const { id } = useParams(); // URL에서 환자 ID를 가져옵니다.
    const [patientData, setPatientData] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [error, setError] = useState(null); // 오류 상태 추가
    const [selectedLine, setSelectedLine] = useState(null);

    const [show, setShow] = useState(false); // offCanvas 상태를 저장
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        console.log(`Fetching data for ID: ${id}`); // ID 값을 콘솔에 출력하여 확인
        axios.get(`http://localhost:8080/api/ER/patient-details/${id}`)
            .then(response => {
                setPatientData(response.data);
                setLoading(false); // 로딩 상태 해제
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                setError(error); // 오류 상태 설정
                setLoading(false); // 로딩 상태 해제
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching data: {error.message}</div>; // 오류 메시지 표시
    }

    if (patientData.length === 0) {
        return <div>No patient data found</div>;
    }

    const labels = patientData.map(data => data.patientVitalCreatedAt);
    const temperature = patientData.map(data => data.patientVitalTemperature);
    const heartRate = patientData.map(data => data.patientVitalHr);
    const respiratoryRate = patientData.map(data => data.patientVitalRespiratoryRate);
    const spo2 = patientData.map(data => data.patientVitalSpo2);
    const nibpS = patientData.map(data => data.patientVitalNibpS);
    const nibpD = patientData.map(data => data.patientVitalNibpD);

    const lineData = {
        labels: labels,
        datasets: [
            {
                label: 'Temperature',
                data: temperature,
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2
            },
            {
                label: 'Heart Rate',
                data: heartRate,
                fill: false,
                borderColor: 'rgba(153,102,255,1)',
                borderWidth: 2
            },
            {
                label: 'Respiratory Rate',
                data: respiratoryRate,
                fill: false,
                borderColor: 'rgba(255,159,64,1)',
                borderWidth: 2
            },
            {
                label: 'SpO2',
                data: spo2,
                fill: false,
                borderColor: 'rgba(54,162,235,1)',
                borderWidth: 2
            },
            {
                label: 'Systolic BP',
                data: nibpS,
                fill: false,
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 2
            },
            {
                label: 'Diastolic BP',
                data: nibpD,
                fill: false,
                borderColor: 'rgba(255,206,86,1)',
                borderWidth: 2
            },
        ]
    };

    const options = {
        maintainAspectRatio: false, // maintainAspectRatio를 false로 설정하여 차트가 지정한 크기로 고정됩니다.
        responsive: true, // 차트가 반응형으로 동작하도록 설정합니다.
        aspectRatio: 2, // 차트의 가로/세로 비율을 설정합니다

        plugins: {
            datalabels: {
                display: true,
                color: 'black',
                align: 'top',
                formatter: (value) => value,
            },
        },
    };
        

    // 라벨 버튼을 렌더링하는 함수입니다.
    const renderLabelButtons = () => {
        return lineData.datasets.map((dataset, index) => (
            <Col>
                <Row md={2}>
                    <Button
                        className="list-group-item list-group-item-action"
                        onClick={() => setSelectedLine(index)}
                        style={{
                            fontWeight: selectedLine === index ? 'bold' : 'normal',
                            backgroundColor: selectedLine === index ? '#007bff' : 'transparent',
                            color: selectedLine === index ? 'white' : 'black',
                            width: '100%', // 버튼이 칼럼의 전체 너비를 차지하도록 설정
                        }}
                    >
                        {dataset.label}
                    </Button>
                </Row>
            </Col>
        ));
    };

    return (
        <div>
            <Navbar bg="blue" expand={false} className="ourheader">
                <div className="headerContainer">
                    <Navbar.Toggle as="div" aria-controls="offcanvasNavbar">
                        <Button variant="link" onClick={handleShow}>
                            <img src={menuWhite} className="menuimg" alt="Menu" />
                        </Button>
                    </Navbar.Toggle>
                    <Navbar.Offcanvas show={show} onHide={handleClose} id="offcanvasNavbar">
                        <Offcanvas.Header closeButton></Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="list-group list-group-flush order-last">
                                <Nav.Link href="#" className="list-group-item list-group-item-action">Present Patient</Nav.Link>
                                <Nav.Link href="#" className="list-group-item list-group-item-action">All Patient</Nav.Link>
                                <Nav.Link href="#" className="list-group-item list-group-item-action">Search Patient</Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                    <div className="titleSet">
                        <div className="MainTitle">NCDSS</div>
                        <div className="SubTitle">by NAMNAM</div>
                    </div>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" className="btn hopitalUser">
                            스마트병원
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#">Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Navbar>
            <Container fluid>
                <Row className='detailUser g-0'>
                    {patientData.length > 0 && (
                        <>
                            <Col>P-ID : {patientData[0].patientId}</Col>
                            <Col>Name : {patientData[0].patientName}</Col>
                            <Col>Sex : {patientData[0].patientSex}</Col>
                            <Col>NCDSS : {patientData[0].deepNcdss}</Col>
                            <Col>
                                <Dropdown className="detailStayID">
                                    <Dropdown.Toggle variant="outline-secondary">
                                        {patientData[0].admissionInTime}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#">Action</Dropdown.Item>
                                        <Dropdown.Item href="#">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </>
                    )}
                </Row>
                <Row className="d-flex g-0">
                    <Col md={3}>
                        <div className="list-group text-center">
                            {renderLabelButtons()}
                        </div>
                    </Col>
                    <Col md={9} className="g-0">
                        <Line data={lineData} options={options} />
                    </Col>
                </Row>
                <Row className="g-0">
                    <Col md={3} className="g-0 text-center">
                        <Table striped bordered hover variant="dark">
                            <tbody>
                                <tr><td>MT</td></tr>
                                <tr><td>Temp</td></tr>
                                <tr><td>HR</td></tr>
                                <tr><td>RR</td></tr>
                                <tr><td>SPO2</td></tr>
                                <tr><td>SBP</td></tr>
                                <tr><td>DBP</td></tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col md={9} className='d-flex'>
                        {patientData.map((vital, index) => (
                            <Table striped bordered hover variant="white" key={index} className="detailTwoBottomTable">
                                <tbody>
                                    <tr><td>{vital.patientVitalCreatedAt}</td></tr>
                                    <tr><td>{vital.patientVitalTemperature}</td></tr>
                                    <tr><td>{vital.patientVitalHr}</td></tr>
                                    <tr><td>{vital.patientVitalRespiratoryRate}</td></tr>
                                    <tr><td>{vital.patientVitalSpo2}</td></tr>
                                    <tr><td>{vital.patientVitalNibpS}</td></tr>
                                    <tr><td>{vital.patientVitalNibpD}</td></tr>
                                </tbody>
                            </Table>
                        ))}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default DetailComponent;
