import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';

const Dashboard = () => {
    const [userData, setUserData] = useState({ totalUsers: 0, activeUsers: 0 });
    const [systemMetrics, setSystemMetrics] = useState({ cpuUsage: '0%', memoryUsage: '0%', diskUsage: '0%' });
    const [userActivity, setUserActivity] = useState({ labels: [], data: [] });

    useEffect(() => {
        // 시스템 메트릭 데이터 가져오기
        axios.get('http://localhost:5000/api/system_metrics').then(response => {
            const metrics = response.data;
            setSystemMetrics({
                cpuUsage: `${metrics.cpu_usage}%`,
                memoryUsage: `${metrics.memory_usage}%`,
                diskUsage: `${metrics.disk_usage}%`
            });
        }).catch(error => {
            console.error("There was an error fetching system metrics!", error);
        });

        // 사용자 데이터 가져오기
        axios.get('http://localhost:8080/api/users/count').then(response => {
            setUserData(prevState => ({ ...prevState, totalUsers: response.data }));
        }).catch(error => {
            console.error("There was an error fetching total users!", error);
        });

        axios.get('http://localhost:8080/api/users/active').then(response => {
            setUserData(prevState => ({ ...prevState, activeUsers: response.data }));
        }).catch(error => {
            console.error("There was an error fetching active users!", error);
        });

        // 사용자 활동 데이터 가져오기
        axios.get('http://localhost:8080/api/user-activity').then(response => {
            const activityData = response.data;
            const today = new Date();
            const pastWeekDates = Array.from({ length: 7 }, (_, i) => {
                const date = new Date(today);
                date.setDate(today.getDate() - i);
                return date.toISOString().split('T')[0];
            }).reverse();

            const activityCountMap = pastWeekDates.reduce((acc, date) => {
                acc[date] = 0;
                return acc;
            }, {});

            activityData.forEach(activity => {
                const date = activity.activityDate.split('T')[0];
                if (activityCountMap[date] !== undefined) {
                    activityCountMap[date]++;
                }
            });

            const labels = Object.keys(activityCountMap);
            const data = Object.values(activityCountMap);

            setUserActivity({ labels, data });
        }).catch(error => {
            console.error("There was an error fetching user activity!", error);
        });
    }, []);

    const userActivityData = {
        labels: userActivity.labels,
        datasets: [
            {
                label: 'User Activity',
                data: userActivity.data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }
        ]
    };

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
                            <Card.Text>{userData.totalUsers}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Active Users</Card.Title>
                            <Card.Text>{userData.activeUsers}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className={`text-center text-success`}>
                        <Card.Body>
                            <Card.Title>CPU Usage</Card.Title>
                            <Card.Text>{systemMetrics.cpuUsage}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className={`text-center text-warning`}>
                        <Card.Body>
                            <Card.Title>Memory Usage</Card.Title>
                            <Card.Text>{systemMetrics.memoryUsage}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className={`text-center text-danger`}>
                        <Card.Body>
                            <Card.Title>Disk Usage</Card.Title>
                            <Card.Text>{systemMetrics.diskUsage}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
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
