import menuWhite from '../../assets/images/menuwhite.png';
import menu from '../../assets/images/menu.png';
import '../../assets/scss/currentpage.scss';

import React, { useState } from "react";
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



const DetailComponent = () => {

        // 선택된 라인의 인덱스를 저장하는 state입니다.
    const [selectedLine, setSelectedLine] = useState(null);

    // 그래프에 사용할 데이터를 정의합니다.
    const lineData = {
        labels: ['A', 'B', 'C', 'D', 'E', 'F'],
        datasets: [
            {
                label: 'Temperature',
                data: [36, 37, 35.5, 37.5, 36.5, 37],
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: selectedLine === 0 ? 4 : 1,  // 선택된 라인이면 굵기를 4로, 아니면 1로 설정합니다.
            },
            {
                label: 'Heart Rate',
                data: [60, 100, 50, 110, 70, 80],
                fill: false,
                borderColor: 'rgba(153,102,255,1)',
                borderWidth: selectedLine === 1 ? 4 : 1,  // 선택된 라인이면 굵기를 4로, 아니면 1로 설정합니다.
            },
            {
                label: 'Respiratory Rate',
                data: [12, 20, 11, 21, 13, 22],
                fill: false,
                borderColor: 'rgba(255,159,64,1)',
                borderWidth: selectedLine === 2 ? 4 : 1,  // 선택된 라인이면 굵기를 4로, 아니면 1로 설정합니다.
            },
            {
                label: 'SpO2',
                data: [93, 96, 95, 97, 95, 100],
                fill: false,
                borderColor: 'rgba(54,162,235,1)',
                borderWidth: selectedLine === 3 ? 4 : 1,  // 선택된 라인이면 굵기를 4로, 아니면 1로 설정합니다.
            },
            {
                label: 'Systolic BP',
                data: [90, 120, 100, 99, 110, 105],
                fill: false,
                borderColor: 'rgba(54,200,235,1)',
                borderWidth: selectedLine === 4 ? 4 : 1,  // 선택된 라인이면 굵기를 4로, 아니면 1로 설정합니다.
            },
            {
                label: 'Diastolic BP',
                data: [65, 60, 70, 61, 66, 75],
                fill: false,
                borderColor: 'rgba(12,102,235,1)',
                borderWidth: selectedLine === 5 ? 4 : 1,  // 선택된 라인이면 굵기를 4로, 아니면 1로 설정합니다.
            },
        ],
    };

    // 차트의 옵션을 정의합니다.
    const options = {
        maintainAspectRatio: false, // maintainAspectRatio를 false로 설정하여 차트가 지정한 크기로 고정됩니다.
        responsive: true, // 차트가 반응형으로 동작하도록 설정합니다.
        aspectRatio: 2, // 차트의 가로/세로 비율을 설정합니다

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

    /* 테이블 map */
    const headers = Array.from({ length: 6 }, () => 100);
    const rows = [];
    for (let i = 90; i >= 10; i -= 10) {
      rows.push(Array.from({ length: 6 }, () => i));
    }
  
    // 각 열의 글자 색깔 배열
    const columnTextColors = ["#FF0000", "#00FF00", "#0000FF", "#FFA500", "#800080", "#008080"];












    return (
        <div>
            {/* header area */}
            <header className="ourheader">
                <div className="headerContainer">

                    {/* 왼쪽 카테고리 사이드바 */}
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

                    {/* 메인 NCDSS + by NAMNAM */}
                    <div className="titleSet">
                        <div className="MainTitle">NCDSS</div>
                        <div className="SubTitle">by NAMNAM</div>
                    </div>

                    {/* 오른쪽 병원이름 드롭다운 */}
                    <div class="dropdown">
                    <button class="btn hopitalUser" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        스마트병원
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Logout</a></li>
                    </ul>
                    </div>

                </div>
            </header>

            {/* P-ID */}
            <div className='detailUser'>
                <div>STAY-ID : 2024-05-29 23:11:24</div>
                <div>P-ID : P-970107</div>
                <div>Name : 김동완 </div>
                <div>Sex : M</div>
                <div>Acuity : 12</div>
                <div>NCDSS : Home</div>
                <div>Desposition : Home</div>
                <div>

                <div className="dropdown detailStayID">
                    <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        2024-05-29 23:11:24
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>

                </div>

            </div>
        
            {/* detailtop */}
            <div className='detailTop'>
                {/* Graph choice */}
                <div className='topOnearea'>

                {/* Graph choice 함수 */}
                <div className="list-group GraphChoice" style={{ marginRight: '' }}>
                {renderLabelButtons()}
                </div>


                {/* Graph Point 표  */}
                <div className='GraphPoint'>

                <table className="table table-borderless tableGraphPoint">
                <thead>
                    <tr>
                    {headers.map((header, index) => (
                        <td key={`header-${index}`} style={{ color: columnTextColors[index] }}>
                        {header}
                        </td>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                    <tr key={`row-${rowIndex}`}>
                        {row.map((cell, cellIndex) => (
                        <td key={`cell-${rowIndex}-${cellIndex}`} style={{ color: columnTextColors[cellIndex] }}>
                            {cell}
                        </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
                </table>

                </div>


                </div>

                {/* Graph */}
                <div className='topTwoarea'>
                
                {/* Graph 함수 */}
                <div className='GraphArea' style={{ flexGrow: 1, width: '100%', height :'40vh', padding : '10px',overflow: 'hidden' }}>
                <Line data={lineData} options={options} />
                </div>

                </div>

            </div>

            {/* detailBottom */}

            <div className='detailBottom'>
            {/* 첫번째 생체 컬럼 공간 */}
            <div className='detailOneBottom'>

            <table className="table table-dark table-striped detailTableTitle" >
                <thead>
                    <tr>
                    <th className='inspectionTimeTitle'>Inspection Time</th>
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
                    <th>nibp_d</th >
                    </tr>
                    <tr>
                    <th>NCDSS</th  >
                    </tr>
                    <tr>
                    <th>Dispostion</th  >
                    </tr>
                </tbody>
                </table>

            </div>
            {/* 실제 데이터 공간 */}
            <div className='detailTwoBottom'>

            <table class="table detailTwoBottomTable">
            <thead>
                <tr className='detailTwoBottomDate'>
                <td>24.05.30 <br />16:30:12</td>
                <td>24.05.30 <br />16:30:12</td>
                <td>24.05.30 <br />16:30:12</td>
                <td>24.05.30 <br />16:30:12</td>
                <td>24.05.30 <br />16:30:12</td>
                <td>24.05.30 <br />16:30:12</td>
                <td>24.05.30 <br />16:30:12</td>
                <td>24.05.30 <br />16:30:12</td>
                <td>24.05.30 <br />16:30:12</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>37.5°C</td>
                <td>37.5°C</td>
                <td>37.5°C</td>
                <td>37.5°C</td>
                <td>37.5°C</td>
                <td>37.5°C</td>
                <td>37.5°C</td>
                <td>37.5°C</td>
                <td>37.5°C</td>
                </tr>
                <tr>
                <td>66</td>
                <td>66</td>
                <td>66</td>
                <td>66</td>
                <td>66</td>
                <td>66</td>
                <td>66</td>
                <td>66</td>
                <td>66</td>
                </tr>
                <tr>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                </tr>
                <tr>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                </tr>
                <tr>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                </tr>
                <tr>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                </tr>
                <tr>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                </tr>
                <tr>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                <td>77</td>
                </tr>
            </tbody>
            </table>










            </div>

            </div>






























            </div>


    );
}

export default DetailComponent;
