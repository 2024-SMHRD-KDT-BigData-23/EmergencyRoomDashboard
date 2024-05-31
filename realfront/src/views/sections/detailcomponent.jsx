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
                <button
                    key={index}
                    className="list-group-item list-group-item-action"
                    onClick={() => setSelectedLine(index)}
                    style={{
                        fontWeight: selectedLine === index ? 'bold' : 'normal',
                        backgroundColor: selectedLine === index ? '#007bff' : 'transparent',
                        color: selectedLine === index ? 'white' : 'black'
                    }}
                >
                    {dataset.label}
                </button>
            ));
        };
    


    return (
        <div>
            <header className="ourheader">
                <div className="headerContainer">
                    <a className="btn" data-bs-toggle="offcanvas" href="#offcanvasExample" role="img" aria-controls="offcanvasExample">
                        <img src={menuWhite} className="menuimg" width="40px" height="40px" alt="Menu" />
                    </a>
                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div className="offcanvas-header">
                            <img src={menu} width="40px" height="40px" alt="Menu" />
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <div className="list-group list-group-flush" style={{ width: "300px" }}>
                                <a href="#" className="list-group-item list-group-item-action">Present Patient</a>
                                <a href="#" className="list-group-item list-group-item-action">All Patient</a>
                                <a href="#" className="list-group-item list-group-item-action">Search Patient</a>
                            </div>
                        </div>
                    </div>
                    <div className="titleSet">
                        <div className="MainTitle">NCDSS</div>
                        <div className="SubTitle">by NAMNAM</div>
                    </div>

                    {/* 오른쪽 병원이름 드롭다운 */}
                    <div className="dropdown">
                        <button className="btn hopitalUser" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            스마트병원
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </header>
            <div className='detailUser'>
                <div>P-ID : {patientData[0].patientId}</div>
                <div>Name : {patientData[0].patientName} </div>
                <div>Sex : {patientData[0].patientSex}</div>
                <div>NCDSS : {patientData[0].deepNcdss}</div>
                <div>
                    <div className="dropdown detailStayID">
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {patientData[0].admissionInTime}
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='detailTop' >
            <div className='detailTop'>
                <div className='topOnearea'>
                    {/* Graph choice 함수 */}
                    <div className="list-group GraphChoice" style={{ marginRight: '20px' }}>
                        {renderLabelButtons()}
                    </div>
                </div>
                {/* Graph */}
                <div className='topTwoarea'>
                    {/* Graph 함수 */}
                    <div className='GraphArea' style={{ flexGrow: 1, width: '100%', height: '40vh', padding: '10px', overflow: 'hidden' }}>
                        <Line data={lineData} options={options} />
                    </div>
                </div>
            </div>
            <div className='detailBottom d-flex'>
                <div className='detailOneBottom'>
                    <table className="table table-dark table-striped detailTableTitle">
                        <thead>
                            <tr>
                                <th>Inspection Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Temperature</th>
                            </tr>
                            <tr>
                                <th>HR</th>
                            </tr>
                            <tr>
                                <th>RR</th>
                            </tr>
                            <tr>
                                <th>SPO2</th>
                            </tr>
                            <tr>
                                <th>nibp_s</th>
                            </tr>
                            <tr>
                                <th>nibp_d</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='detailTwoBottom d-flex'>
                    {patientData.map((vital, index) => (
                        <table className="table detailTwoBottomTable" key={index}>
                            <thead>
                                <tr className='detailTwoBottomDate'>
                                    <th>{vital.patientVitalCreatedAt}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{vital.patientVitalTemperature}</td>
                                </tr>
                                <tr>
                                    <td>{vital.patientVitalHr}</td>
                                </tr>
                                <tr>
                                    <td>{vital.patientVitalRespiratoryRate}</td>
                                </tr>
                                <tr>
                                    <td>{vital.patientVitalSpo2}</td>
                                </tr>
                                <tr>
                                    <td>{vital.patientVitalNibpS}</td>
                                </tr>
                                <tr>
                                    <td>{vital.patientVitalNibpD}</td>
                                </tr>
                            </tbody>
                        </table>
                    ))}
                </div>
                </div>
            </div>
        </div>
    );
};

export default DetailComponent;
