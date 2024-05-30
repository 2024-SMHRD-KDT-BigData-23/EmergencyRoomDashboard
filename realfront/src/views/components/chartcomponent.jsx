import React, { useState, useEffect } from "react";
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
import axios from 'axios';

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

const PatientChart = () => {
    // 선택된 라인의 인덱스를 저장하는 state입니다.
    const [selectedLine, setSelectedLine] = useState(null);
    const [patientData, setPatientData] = useState([]);

    // 컴포넌트가 마운트될 때 데이터를 가져옵니다.
    useEffect(() => {
        axios.get('http://localhost:8080/api/patientData') 
            .then(response => {
                setPatientData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    // 그래프에 사용할 데이터를 정의합니다.
    const lineData = {
        labels: patientData.map(item => item.time),
        datasets: [
            {
                label: 'Temperature (°C)',
                data: patientData.map(item => item.temperature),
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: selectedLine === 0 ? 4 : 1,
            },
            {
                label: 'Heart Rate (bpm)',
                data: patientData.map(item => item.heartRate),
                fill: false,
                borderColor: 'rgba(153,102,255,1)',
                borderWidth: selectedLine === 1 ? 4 : 1,
            },
            {
                label: 'Respiratory Rate (breaths/min)',
                data: patientData.map(item => item.respiratoryRate),
                fill: false,
                borderColor: 'rgba(255,159,64,1)',
                borderWidth: selectedLine === 2 ? 4 : 1,
            },
            {
                label: 'SpO2 (%)',
                data: patientData.map(item => item.spo2),
                fill: false,
                borderColor: 'rgba(54,162,235,1)',
                borderWidth: selectedLine === 3 ? 4 : 1,
            },
            {
                label: 'Systolic BP (mmHg)',
                data: patientData.map(item => item.systolicBP),
                fill: false,
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: selectedLine === 4 ? 4 : 1,
            },
            {
                label: 'Diastolic BP (mmHg)',
                data: patientData.map(item => item.diastolicBP),
                fill: false,
                borderColor: 'rgba(255,206,86,1)',
                borderWidth: selectedLine === 5 ? 4 : 1,
            },
        ],
    };

    // 차트의 옵션을 정의합니다.
    const options = {
        plugins: {
            datalabels: {
                display: true,
                color: 'black',
                align: 'top',
                formatter: (value) => value, // 데이터 포인트 값을 레이블로 표시합니다.
            },
        },
        // 차트의 요소를 클릭했을 때 실행되는 함수입니다.
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const datasetIndex = elements[0].datasetIndex;  // 클릭된 요소의 데이터셋 인덱스를 가져옵니다.
                setSelectedLine(datasetIndex);  // 선택된 라인의 인덱스를 업데이트합니다.
            }
        },
    };

    return (
        <div>
            <h3>Line Chart</h3>
            <Line data={lineData} options={options} />
        </div>
    );
};

export default PatientChart;
