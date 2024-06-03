import React, { useEffect, useRef } from "react";
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

const VitalLineChart = ({ patientData, lineData, selectedLine, setSelectedLine }) => {


    const chartContainerRef = useRef(null);



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

    // patientData의 상태 변화를 감지해 차트의 스크롤을 제일 오른쪽으로 변경하기
    useEffect(() => {
        if (patientData.length > 0) {
            // 차트가 렌더링되는 컨테이너의 ref를 이용하여 스크롤 위치 조정
            const chartContainer = chartContainerRef.current;

            if (chartContainer) {
                // 스크롤을 가장 오른쪽으로 이동
                chartContainer.scrollLeft = chartContainer.scrollWidth - chartContainer.clientWidth;
            }
        }
    }, [patientData]);

    return (
        <>
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
        </>
    );
};

export default VitalLineChart;