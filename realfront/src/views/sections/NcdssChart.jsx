import React from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

// 플러그인 정의
const centerTextPlugin = {
    id: 'centerText',
    afterDraw: (chart) => {
        const ctx = chart.ctx;
        const { width, height } = chart;
        const { datasets } = chart.data;
        const labels = chart.data.labels;
        const data = datasets[0].data;
        const maxIndex = data.indexOf(Math.max(...data));
        const color = datasets[0].backgroundColor[maxIndex];
        const maxLabel = labels[maxIndex];

        ctx.save();
        ctx.font = 'bold 20px Arial';
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(maxLabel, width / 2, height - 10);
        ctx.restore();
    }
};

const NcdssChart = ({ patientData, selectedPointIndex }) => {

    if (!patientData || selectedPointIndex === undefined || selectedPointIndex === null) {
        return null; // 데이터가 없거나 selectedPointIndex가 undefined/null이면 컴포넌트를 렌더링하지 않음
    }

    const dischargePer = patientData[selectedPointIndex].deepHomePercent;
    const wardPer = patientData[selectedPointIndex].deepWardPercent;
    const icuPer = patientData[selectedPointIndex].deepIcuPercent;

    const data = {
        labels: ["Discharge", "Ward", "ICU"],
        datasets: [{
            data: [dischargePer, wardPer, icuPer],
            backgroundColor: ['#8282EC', '#95EB95', '#DD6666'],
            borderColor: ['#8282EC', '#95EB95', '#DD6666'],
            borderWidth: 1,
            hoverBackgroundColor: ['#8282EC', '#95EB95', '#DD6666'],
            hoverBorderColor: ['#8282EC', '#95EB95', '#DD6666'],
            hoverBorderWidth: 2,
            weight: 1,
            cutout: '50%',
            circumference: 180,
            rotation: -90,
            spacing: 2,
            offset: 0
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "chartArea",
                labels: {
                    font: {
                        // size: 16,
                        weight: 'bold'
                    }
                }
            },
            title: {
                display: true,
                text: "NCDSS",
                font: {
                    size: 20, // 폰트 크기
                    weight: 'bold', // 폰트 굵기
                }
            },
            centerText: {},
            
            datalabels: {
                color: '#323232', // 수치값의 폰트 색상을 흰색으로 설정
                font: {
                    size: 16, // 수치값의 폰트 크기 설정
                    weight : 'bold'
                },
                formatter: (value, context) => {
                    return value + '%'; // 수치값에 '%' 추가
                }
            },
        }
    };

    return <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />;
};

export default NcdssChart;