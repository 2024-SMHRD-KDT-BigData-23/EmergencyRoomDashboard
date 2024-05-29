import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from 'axios';
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

// ChartJS에 필요한 구성 요소들을 등록합니다.
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PatientEMRChart = () => {
    // 선택된 라인의 인덱스를 저장하는 state입니다.
    const [selectedLine, setSelectedLine] = useState(null);
    // 환자 데이터를 저장하는 state입니다.
    const [lineData, setLineData] = useState({
        labels: [],
        datasets: []
    });

    // 컴포넌트가 마운트될 때 환자 데이터를 가져옵니다.
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 예시 API 엔드포인트에서 데이터를 가져옵니다.
                const response = await axios.get('http://localhost:8080/api/patientData');
                const emrData = response.data;
                
                // 가져온 데이터를 그래프 형식으로 변환합니다.
                const formattedData = {
                    labels: emrData.labels,
                    datasets: emrData.datasets.map((dataset, index) => ({
                        label: dataset.label,
                        data: dataset.data,
                        fill: false,
                        borderColor: dataset.color,
                        borderWidth: selectedLine === index ? 4 : 1,
                    })),
                };
                
                setLineData(formattedData);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, [selectedLine]);

    // 차트의 옵션을 정의합니다.
    const options = {
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
            <h3>Patient EMR Chart</h3>
            <Line data={lineData} options={options} />   
        </div>
    );
};

export default PatientEMRChart;
