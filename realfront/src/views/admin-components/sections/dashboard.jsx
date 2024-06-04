import React from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';

const Dashboard = () => {

    const userActivityData = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                label: 'User Activity',
                data: [12, 19, 3, 5, 2, 3, 9],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }
        ]
    };

    const systemMetrics = [
        { label: 'CPU Usage', value: '15%', color: 'success' },
        { label: 'Memory Usage', value: '45%', color: 'warning' },
        { label: 'Disk Usage', value: '80%', color: 'danger' }
    ];

    const alerts = [
        { id: 1, message: 'High CPU usage detected', type: 'danger' },
        { id: 2, message: 'New user registered', type: 'success' },
        { id: 3, message: 'Database backup completed', type: 'info' }
    ];

    const systemComponents = [
        { component: 'Database', status: 'Online' },
        { component: 'Server', status: 'Online' },
        { component: 'API', status: 'Offline' }
    ];

    return (
        <Container fluid className="p-3">
            {/* 상단 섹션 */}
            <Row className="mb-3">
                <Col>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Total Users</Card.Title>
                            <Card.Text>1000</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Active Users</Card.Title>
                            <Card.Text>150</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                {systemMetrics.map(metric => (
                    <Col key={metric.label}>
                        <Card className={`text-center text-${metric.color}`}>
                            <Card.Body>
                                <Card.Title>{metric.label}</Card.Title>
                                <Card.Text>{metric.value}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* 중간 섹션 */}
            <Row className="mb-3">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>User Activity</Card.Title>
                            <Line data={userActivityData} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* 하단 섹션 */}
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Recent Alerts</Card.Title>
                            <ul className="list-group">
                                {alerts.map(alert => (
                                    <li key={alert.id} className={`list-group-item list-group-item-${alert.type}`}>
                                        {alert.message}
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>System Components Status</Card.Title>
                            <ul className="list-group">
                                {systemComponents.map(component => (
                                    <li key={component.component} className="list-group-item">
                                        {component.component}: {component.status}
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
