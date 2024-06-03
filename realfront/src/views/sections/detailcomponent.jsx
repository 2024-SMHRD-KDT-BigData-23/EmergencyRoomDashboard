
<<<<<<< HEAD
import React, { useState, useEffect,useRef } from "react";
import { useParams,useNavigate } from "react-router-dom";
=======
import menuWhite from '../../assets/images/menuwhite.png';
import menu from '../../assets/images/menu.png';

import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
>>>>>>> dev

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
import { Button, Dropdown, Container, Row, Col, Table } from 'react-bootstrap';

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
    const navigate = useNavigate();
    const { id } = useParams(); // URL에서 환자 ID를 가져옵니다.
    const [patientData, setPatientData] = useState([]);
    // const [loading, setLoading] = useState(true); // 로딩 상태 추가
    // const [error, setError] = useState(null); // 오류 상태 추가
    const [deepNcdss, setDeepNcdss] = useState(null);
    const [resultWard, setResultWard] = useState(null);
    const [showButtons, setShowButtons] = useState(true);
    const [selectedLine, setSelectedLine] = useState(0);
    const chartContainerRef = useRef(null);
    const tableContainerRef = useRef(null);

    const chartScrollLeft = () => {
        if (chartContainerRef.current) {
            chartContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
        }
    };

    const chartScrollRight = () => {
        if (chartContainerRef.current) {
            chartContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
        }
    };

    const tableScrollLeft = () => {
        if (tableContainerRef.current) {
            tableContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
        }
    };

    const tableScrollRight = () => {
        if (tableContainerRef.current) {
            tableContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
        }
    };

    // Timestamp 형식의 데이터를 "년/월/일/시/분/초"로 쪼개주는 함수
    const extraDateAndTime = (timestamp) => {
        const date = new Date(timestamp);
        // 각 구성 요소를 개별적으로 추출
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();

        // 추출된 구성 요소를 객체로 반환
        return {
            year,
            month,
            day,
            hour,
            minute,
            second
        };
    }
    const updateResultWard = (newResultWard) => {
        axios.patch(`http://localhost:8080/api/ER/set/medical-patients/${id}`, { 
            admissionId: id,
            admissionResultWard: newResultWard
        })
        .then(response => {
            console.log('DB 업데이트 성공:', response.data);
            setResultWard(newResultWard);
            setShowButtons(false);
        })
        .catch(error => {
            console.error('DB 업데이트 실패:', error);
        });
    };
    

    const handleEdit = () => {
        setShowButtons(true);
    };

    // 서버와 통신을 통해 환자의 상세 정보 가져오기
    useEffect(() => {
        console.log(`Fetching data for ID: ${id}`); // ID 값을 콘솔에 출력하여 확인
        axios.get(`http://localhost:8080/api/ER/patient-details/${id}`)
            .then(response => {
                const formattedData = response.data.map(item => ({
                    ...item,
                    patientVitalCreatedAt: extraDateAndTime(item.patientVitalCreatedAt)
                }));
                console.log(formattedData);
                setPatientData(formattedData);
                setDeepNcdss(formattedData[0].deepNcdss || "null");
                setResultWard(formattedData[0].admissionResultWard || "null");
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                setDeepNcdss("Error fetching data");
            setResultWard("Error fetching data");
                // setError(error); // 오류 상태 설정
                // setLoading(false); // 로딩 상태 해제
            });
    }, [id]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>Error fetching data: {error.message}</div>; // 오류 메시지 표시
    // }

    // if (patientData.length === 0) {
    //     return <div>No patient data found</div>;
    // }

    // patientData의 상태 변화를 감지해 차트의 스크롤을 제일 오른쪽으로 변경하기
    useEffect(() => {
        if (patientData.length > 0) {
            // 차트가 렌더링되는 컨테이너의 ref를 이용하여 스크롤 위치 조정
            const chartContainer = chartContainerRef.current;
            const tableContainer = tableContainerRef.current;

            if (chartContainer) {
                // 스크롤을 가장 오른쪽으로 이동
                chartContainer.scrollLeft = chartContainer.scrollWidth - chartContainer.clientWidth;
                tableContainer.scrollLeft = tableContainer.scrollWidth - tableContainer.clientWidth;
            }
        }
    }, [patientData]);

    // "월/일 시:분" 형식의 문자열로 만들어 labels 배열에 저장
    const labels = patientData.map(data => {
        const month = data.patientVitalCreatedAt.month;
        const day = data.patientVitalCreatedAt.day;
        const hour = data.patientVitalCreatedAt.hour;
        const minute = data.patientVitalCreatedAt.minute;

        return `${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    });

    const temperature = patientData.map(data => data.patientVitalTemperature);
    const heartRate = patientData.map(data => data.patientVitalHr);
    const respiratoryRate = patientData.map(data => data.patientVitalRespiratoryRate);
    const spo2 = patientData.map(data => data.patientVitalSpo2);
    const nibpS = patientData.map(data => data.patientVitalNibpS);
    const nibpD = patientData.map(data => data.patientVitalNibpD);

    // // Set을 사용하여 중복 제거
    // const uniqueLabels = Array.from(new Set(labels));
    // // 원래 데이터 크기만큼의 빈 배열 생성
    // const xLabels = new Array(labels.length).fill('');
    // // 중복되지 않는 날짜를 해당 인덱스 삽입
    // uniqueLabels.forEach((date, index) => {
    //     xLabels[index] = date;
    // });

    const lineData = {
        labels: labels,
        datasets: [
            {
                label: 'Temp',
                data: temperature,
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: selectedLine === 0 ? 4 : 1
            },
            {
                label: 'HR',
                data: heartRate,
                fill: false,
                borderColor: 'rgba(153,102,255,1)',
                borderWidth: selectedLine === 1 ? 4 : 1
            },
            {
                label: 'RR',
                data: respiratoryRate,
                fill: false,
                borderColor: 'rgba(255,159,64,1)',
                borderWidth: selectedLine === 2 ? 4 : 1
            },
            {
                label: 'SPO2',
                data: spo2,
                fill: false,
                borderColor: 'rgba(54,162,235,1)',
                borderWidth: selectedLine === 3 ? 4 : 1
            },
            {
                label: 'SBP',
                data: nibpS,
                fill: false,
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: selectedLine === 4 ? 4 : 1
            },
            {
                label: 'DBP',
                data: nibpD,
                fill: false,
                borderColor: 'rgba(255,206,86,1)',
                borderWidth: selectedLine === 5 ? 4 : 1
            },
        ]
    };

    // 차트의 디테일한 설정(react-chartjs-2, chartjs-plugin-datalabels)
    const options = {
        maintainAspectRatio: false, // maintainAspectRatio를 false로 설정하여 차트가 지정한 크기로 고정됩니다.
        responsive: true, // 차트가 반응형으로 동작하도록 설정합니다.
        scales: {
            x: {
                display: true
            },
            y: {
                display: false
            }
        },
        plugins: {
            datalabels: {
                display: (context) => {
                    return context.datasetIndex === selectedLine;
                },
                color: 'black',
                align: 'top',
                borderWidth: 30,
                formatter: (value) => value,
            },
            legend: {
                display: false
            }
        },
        layout: {
            padding: {
                left: 20,
                right: 40
            }
        },
        // 차트의 요소를 클릭했을 때 실행되는 함수입니다.
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const datasetIndex = elements[0].datasetIndex;  // 클릭된 요소의 데이터셋 인덱스를 가져옵니다.
                setSelectedLine(datasetIndex);  // 선택된 라인의 인덱스를 업데이트
            }
        },
    };

    return (
        <div>
            <Row className='align-items-center'>
                {patientData.length > 0 && (
                    <>
                        <Col>
                            <Button variant="outline-secondary" onClick={() => navigate('/List')}>뒤로가기</Button>
                        </Col>
                        <Col>P-ID <span>{patientData[0].patientId}</span></Col>
                        <Col>Name <span>{patientData[0].patientName}</span></Col>
                        <Col>Sex <span>{patientData[0].patientSex}</span></Col>
                        <Col>NCDSS <span>{patientData[0].deepNcdss}</span></Col>
                        <Col>
                            <Dropdown>
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
            <Container fluid>
                <Row className="g-0">
                    <Col xs={3} className="p-0 m-0">
                        <Row className="g-0 h-100">
                            <Col xs={3} className="d-flex flex-column bg-light">
                                {lineData.datasets.map((dataset, index) => (
                                    <div className="d-flex justify-content-center align-items-center w-100" key={index} onClick={() => setSelectedLine(index)} style={{ cursor: 'pointer', flexGrow: 1, fontWeight: selectedLine === index ? 'bold' : 'normal', backgroundColor: selectedLine === index ? '#007bff' : 'transparent', color: selectedLine === index ? 'white' : 'black' }}>
                                        {dataset.label}
                                    </div>
                                ))}
                            </Col>
                            <Col xs={9} className="h-100"></Col>
                        </Row>
                    </Col>
                    <Col xs={9} className="p-0 m-0 d-flex align-items-center bg-light">
                        <div onClick={chartScrollLeft} className="d-flex align-items-center justify-content-center h-100" style={{ cursor: 'pointer', flex: '0 0 50px' }}>
                            <span>&lt;&lt;</span>
                        </div>
                        <div className="lineContainer flex-grow-1" ref={chartContainerRef} style={{ overflowX: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            <div className="lineContainerBody" style={{ width: '100vw', height: '40vh' }}>
                                <Line data={lineData} options={options} />
                            </div>
                        </div>
                        <div onClick={chartScrollRight} className="d-flex align-items-center justify-content-center h-100" style={{ cursor: 'pointer', flex: '0 0 50px' }}>
                            <span>&gt;&gt;</span>
                        </div>
                    </Col>
                </Row>
               {/* client 판단 공간 */}
               <Row className="g-0">
               <Col xs={3} className="p-0 m-0 d-flex flex-column align-items-center bg-light">
                        <div>NCDSS</div>
                        <div>{deepNcdss !== null ? deepNcdss : 'null'}</div>
                        <div>ResultWard</div>
                        <div>{resultWard  !== null ? resultWard  : 'null'}</div>
                        {showButtons ? (
                            <div>
                                <div>선택 가능한 옵션</div>
                                <Button variant="outline-secondary" onClick={() => updateResultWard('ICU')}>ICU</Button>
                                <Button variant="outline-secondary" onClick={() => updateResultWard('WARD')}>WARD</Button>
                                <Button variant="outline-secondary" onClick={() => updateResultWard('HOME')}>HOME</Button>
                            </div>
                        ) : (
                            <Button variant="outline-secondary" onClick={handleEdit}>수정하기</Button>
                        )}
                    </Col>
                </Row>
                <Row className="g-0 text-center">
                    <Col xs={3} className="p-0 m-0 d-flex flex-column aling-items-stretch">
                        <Table bordered hover variant="light" className="flex-grow-1">
                            <tbody>
                                <tr><td><br />Measured Time<br /><br /></td></tr>
                                <tr><td>Temp</td></tr>
                                <tr><td>HR</td></tr>
                                <tr><td>RR</td></tr>
                                <tr><td>SPO2</td></tr>
                                <tr><td>SBP</td></tr>
                                <tr><td>DBP</td></tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col xs={9} className="p-0 m-0 d-flex bg-light">
                        <div onClick={tableScrollLeft} className="d-flex align-items-center justify-content-center h-100" style={{ cursor: 'pointer', flex: '0 0 50px' }}>
                            <span>&lt;&lt;</span>
                        </div>
                        <div className="tableContainer flex-grow-1" ref={tableContainerRef} style={{ overflowX: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            <div className="talbeContainerBody" style={{ width: '100vw', height: '30vh' }}>
                                <Table responsive bordered hover variant="white" className="d-flex justify-content-between">
                                    {patientData.map((vital, index) => (
                                        <tbody key={index}>
                                            <tr>
                                                <td>
                                                    {vital.patientVitalCreatedAt.year}<br />
                                                    {vital.patientVitalCreatedAt.month + "/" + vital.patientVitalCreatedAt.day}<br />
                                                    {vital.patientVitalCreatedAt.hour + ":" + vital.patientVitalCreatedAt.minute + ":" + vital.patientVitalCreatedAt.second}
                                                </td>
                                            </tr>
                                            <tr><td>{vital.patientVitalTemperature}</td></tr>
                                            <tr><td>{vital.patientVitalHr}</td></tr>
                                            <tr><td>{vital.patientVitalRespiratoryRate}</td></tr>
                                            <tr><td>{vital.patientVitalSpo2}</td></tr>
                                            <tr><td>{vital.patientVitalNibpS}</td></tr>
                                            <tr><td>{vital.patientVitalNibpD}</td></tr>
                                        </tbody>
                                    ))}
                                </Table>
                            </div>
                        </div>
                        <div onClick={tableScrollRight} className="d-flex align-items-center justify-content-center h-100" style={{ cursor: 'pointer', flex: '0 0 50px' }}>
                            <span>&gt;&gt;</span>
                        </div>
                    </Col>
                </Row>
               

            </Container>
        </div >
    );
};

export default DetailComponent;
