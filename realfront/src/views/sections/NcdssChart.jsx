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
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(maxLabel, width / 2, height - 10);
        ctx.restore();
    }
};

const NcdssChart = ({ patientData }) => {

    const dischargePer = patientData.length && patientData[patientData.length - 1].deepHomePercent;
    const wardPer = patientData.length && patientData[patientData.length - 1].deepWardPercent;
    const icuPer = patientData.length && patientData[patientData.length - 1].deepIcuPercent;

    const data = {
        labels: ["DISCHARGE", "WARD", "ICU"],
        datasets: [{
            data: [dischargePer, wardPer, icuPer],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            borderWidth: 1,
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBorderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
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
            // legend: {
            //     display: true,
            //     position: "top"
            // },
            title: {
                display: true,
                text: "NCDSS"
            },
            centerText: {}
        }
    };

    return <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />;
};

export default NcdssChart;