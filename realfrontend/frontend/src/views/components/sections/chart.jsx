import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Line, Bar, Doughnut, Pie, Radar, PolarArea } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale
);

const ChartExample = () => {
    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Line Dataset',
                data: [65, 59, 80, 81, 56, 55],
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const barData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Bar Dataset',
                data: [65, 59, 80, 81, 56, 55],
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    const doughnutData = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    return (
        <div id="chart">
            <div className="spacer" id="chart-components">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h1 className="title font-bold">Charts</h1>
                            <h6 className="subtitle">
                                Here you can check chart demos created with react-chartjs-2.
                            </h6>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
                <Row>
                    <Col md="6">
                        <h3>Line Chart</h3>
                        <Line data={lineData} />
                    </Col>
                    <Col md="6">
                        <h3>Bar Chart</h3>
                        <Bar data={barData} />
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <h3>Doughnut Chart</h3>
                        <Doughnut data={doughnutData} />
                    </Col>
                    <Col md="6">
                        <h3>Pie Chart</h3>
                        <Pie data={doughnutData} />
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <h3>Radar Chart</h3>
                        <Radar data={lineData} />
                    </Col>
                    <Col md="6">
                        <h3>Polar Area Chart</h3>
                        <PolarArea data={doughnutData} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ChartExample;
