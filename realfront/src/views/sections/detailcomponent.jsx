import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import { Button, Dropdown, Row, Col } from 'react-bootstrap';
import VitalLineChart from "../components/details/VitalLineChart";
import VitalsTable from "../components/details/VitalsTable";
import VitalLineChartEvent from "../components/details/VitalLineChartEvent";

const DetailComponent = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // URL에서 환자 ID를 가져옵니다.
    const [patientData, setPatientData] = useState([]);
    
    // const [loading, setLoading] = useState(true); // 로딩 상태 추가
    // const [error, setError] = useState(null); // 오류 상태 추가
    // const [resultWard, setResultWard] = useState(null);
    // const [showButtons, setShowButtons] = useState(true);
    const [selectedLine, setSelectedLine] = useState(0);

    const temperature = patientData.map(data => data.patientVitalTemperature);
    const heartRate = patientData.map(data => data.patientVitalHr);
    const respiratoryRate = patientData.map(data => data.patientVitalRespiratoryRate);
    const spo2 = patientData.map(data => data.patientVitalSpo2);
    const nibpS = patientData.map(data => data.patientVitalNibpS);
    const nibpD = patientData.map(data => data.patientVitalNibpD);
    // const ncdss = patientData.map(data => data.deepNcdss);

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

    // const updateResultWard = (newResultWard) => {
    //     axios.patch(`http://localhost:8080/api/ER/set/medical-patients/${id}`, { 
    //         admissionId: id,
    //         admissionResultWard: newResultWard
    //     })
    //     .then(response => {
    //         console.log('DB 업데이트 성공:', response.data);
    //         setResultWard(newResultWard);
    //         setShowButtons(false);
    //     })
    //     .catch(error => {
    //         console.error('DB 업데이트 실패:', error);
    //     });
    // };

    // const handleEdit = () => {
    //     setShowButtons(true);
    // };

    // 서버와 통신을 통해 환자의 상세 정보 가져오기
    useEffect(() => {
        console.log(`Fetching data for ID: ${id}`); // ID 값을 콘솔에 출력하여 확인
        axios.get(`http://localhost:8080/api/ER/patient-details/${id}`)
            .then(response => {
                const formattedData = response.data.map(item => ({
                    ...item,
                    patientVitalCreatedAt: extraDateAndTime(item.patientVitalCreatedAt)
                }));
                console.log("서버에서 가져온 데이터 ", formattedData);
                setPatientData(formattedData);
                // setResultWard(formattedData[0].admissionResultWard || "null");
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                // setResultWard("Error fetching data");
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

    // "월/일 시:분" 형식의 문자열로 만들어 labels 배열에 저장
    const labels = patientData.map(data => {
        const month = data.patientVitalCreatedAt.month;
        const day = data.patientVitalCreatedAt.day;
        const hour = data.patientVitalCreatedAt.hour;
        const minute = data.patientVitalCreatedAt.minute;

        return `${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    });

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
            <div>
                <Row className="g-0">
                    <Col xs={3} className="p-0 m-0">
                        <VitalLineChartEvent patientData={ patientData } lineData={ lineData } selectedLine={ selectedLine } setSelectedLine={ setSelectedLine }/>
                    </Col>
                    <Col xs={9} className="p-0 m-0 d-flex align-items-center bg-light">
                        <VitalLineChart lineData={ lineData } selectedLine={ selectedLine } setSelectedLine={ setSelectedLine }/>
                    </Col>
                </Row>
               {/* client 판단 공간 */}
               {/* <Row className="g-0">
               <Col xs={3} className="p-0 m-0 d-flex flex-column align-items-center bg-light">
                        <div>NCDSS</div>
                        <span>{ ncdss }</span>
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
                </Row> */}
                <Row className="g-0 text-center">
                    <VitalsTable patientData={ patientData }/>
                </Row>
            </div>
        </div >
    );
};

export default DetailComponent;
