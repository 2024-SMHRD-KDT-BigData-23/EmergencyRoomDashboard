import React, { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
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

const VitalChart = ({ patientData }) => {

    const [selectedLine, setSelectedLine] = useState(0);

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
            // tooltip: {}
        },
        layout: {
            padding: {
                top: 25,
                bottom: 20,
                left: 20,
                right: 20
            }
        },
        elements: {
            line: {
                tension: 0
            },
            point: {
                radius: 3,
                hitRadius: 10,
                hoverRadius: 10,
                pointHitRadius: 20
            }
        },
        onClick: (event, elements, chart) => { // 여기를 수정합니다.
            if (elements.length > 0) {
                const datasetIndex = elements[0].datasetIndex;
                setSelectedLine(datasetIndex);
            } else if (chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false).length > 0) {
                const nearestElements = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
                const firstElement = nearestElements[0];
                if (firstElement && firstElement.element) {
                    setSelectedLine(firstElement.datasetIndex);
                }
            }
        },
    };

    return (
        <>
            <Col md={7}>
                <Row className="d-flex flex-column">
                    <Col>
                        <Row>
                            {lineData.datasets.map((dataset, index) => (
                                <Col md={2} key={index} className="mb-2 text-center align-center">
                                    <Card onClick={() => setSelectedLine(index)} style={{ cursor: 'pointer', fontWeight: selectedLine === index ? 'bold' : 'normal', backgroundColor: selectedLine === index ? lineData.datasets[selectedLine].borderColor : 'white', color: selectedLine === index ? 'white' : 'black' }}>
                                        <Card.Body>
                                            <Card.Title>{dataset.label}</Card.Title>
                                            <Card.Text>
                                                36.5
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col md={12} className="mb-4">
                        <Card className="h-100">
                            <Card.Body className="h-100">
                                <Card.Title>Vital Chart</Card.Title>
                                <Card.Text style={{ height: '67vh' }}>
                                    <Line data={lineData} options={options} />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </>
    );
}

export default VitalChart;