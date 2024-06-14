import React, { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
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
import VitalTable from "./VitalTable";
import ToggleButton from "./ToggleButton";

// ChartJS에 필요한 구성 요소들과 플러그인을 등록합니다.
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels // DataLabels 플러그인을 등록합니다.
);

const VitalChart = ({ patientData, selectedPointIndex, setSelectedPointIndex }) => {

    const [selectedLine, setSelectedLine] = useState(0);
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

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
                label: 'TEMP',
                data: patientData.map(data => data.patientVitalTemperature),
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: selectedLine === 0 ? 4 : 1
            },
            {
                label: 'HR',
                data: patientData.map(data => data.patientVitalHr),
                fill: false,
                borderColor: 'rgba(153,102,255,1)',
                borderWidth: selectedLine === 1 ? 4 : 1
            },
            {
                label: 'RR',
                data: patientData.map(data => data.patientVitalRespiratoryRate),
                fill: false,
                borderColor: 'rgba(255,159,64,1)',
                borderWidth: selectedLine === 2 ? 4 : 1
            },
            {
                label: 'SPO2',
                data: patientData.map(data => data.patientVitalSpo2),
                fill: false,
                borderColor: 'rgba(54,162,235,1)',
                borderWidth: selectedLine === 3 ? 4 : 1
            },
            {
                label: 'SBP',
                data: patientData.map(data => data.patientVitalNibpS),
                fill: false,
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: selectedLine === 4 ? 4 : 1
            },
            {
                label: 'DBP',
                data: patientData.map(data => data.patientVitalNibpD),
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
                title: {
                    display: true,
                    text: 'MT',
                    font: {
                        size: 16,
                    },
                },
                ticks: {
                    fontSize: 16,
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Value',
                    font: {
                        size: 16,
                    },
                },
                ticks: {
                    fontSize: 16,
                },
            },
        },
        plugins: {
            datalabels: {
                display: (context) => {
                    return context.datasetIndex === selectedLine;
                },
                color: 'black',
                align: 'top',
                anchor: 'center',
                // backgroundColor: 'red',
                // borderColor: '#00FF00',
                // borderRadius: 5,
                borderWidth: 30,
                font: { size: 14, weight: 'bold' },
                formatter: (value) => value,
                offset: 0,
                // rotation: 90,
                // textAlign: 'center',
            },
            legend: {
                display: false
            },
            // title: {
            //     display: true,
            //     text: "Patient Vitals",
            //     font: {
            //         size: 20, // 폰트 크기
            //         weight: 'bold', // 폰트 굵기
            //     }
            // },
            // tooltip: {}
        },
        layout: {
            padding: {
                top: 25,
                bottom: 20,
                left: 20,
                right: 20
            },
        },
        elements: {
            line: {
                tension: 0.5
            },
            point: {
                radius: 3,
                hitRadius: 10,
                hoverRadius: 10,
                pointHitRadius: 20
            }
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const datasetIndex = elements[0].datasetIndex;
                const index = elements[0].index;
                setSelectedLine(datasetIndex);
                setSelectedPointIndex(index);
            }
        },
    };

    const handleCellClick = (rowIndex, columnIndex) => {
        // 선택된 셀의 정보를 활용하여 필요한 작업 수행
        if (rowIndex === -1) {
            setSelectedPointIndex(columnIndex);
        } else if (columnIndex === -1) {
            setSelectedLine(rowIndex);
        } else {
            setSelectedLine(rowIndex);
            setSelectedPointIndex(columnIndex);
        }
    };

    return (
        <>
            <Col md={7}>
                <Row>
                    {lineData.datasets.map((dataset, index) => (
                        <Col md={2} key={index} className="mb-3 text-center align-center">
                            <Card onClick={() => setSelectedLine(index)} style={{ cursor: 'pointer', fontWeight: selectedLine === index ? 'bold' : 'normal', backgroundColor: selectedLine === index ? lineData.datasets[selectedLine].borderColor : 'white', color: selectedLine === index ? 'white' : 'black' }}>
                                <Card.Body>
                                    <Card.Title>{dataset.label}</Card.Title>
                                    <Card.Text>
                                        {selectedPointIndex !== null ? dataset.data[selectedPointIndex] : dataset.data[dataset.data.length - 1]}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                    <Col>
                        <Card>
                            <Card.Body className="h-100">
                                <Card.Title className="d-flex justify-content-between align-items-center m-0">
                                    <span>Patient Vitals</span>
                                    {/* <Button variant={isToggled ? 'primary' : 'outline-primary'} onClick={handleToggle}>
                                        {isToggled ? 'Show Chart' : 'Show Table'}
                                    </Button> */}
                                    <ToggleButton checked={isToggled} onChange={handleToggle} />
                                </Card.Title>
                                <Card.Text className="d-flex justify-content-center align-items-center" style={{ height: '41.1rem' }}>
                                    {isToggled === false ?
                                        <Line data={lineData} options={options} />
                                        : <VitalTable data={lineData} onCellClick={handleCellClick} />}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Col >
        </>
    );
}

export default VitalChart;