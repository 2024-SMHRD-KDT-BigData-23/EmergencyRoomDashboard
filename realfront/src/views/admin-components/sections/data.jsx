import React, { useState } from "react";
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';

const Data = () => {
    // 데이터 업로드 상태
    const [uploads, setUploads] = useState([
        { id: 1, date: '2024-06-01', type: 'Patient Data', status: 'Completed' },
        { id: 2, date: '2024-05-30', type: 'Medical Records', status: 'Pending' }
    ]);

    // 감사 로그 상태
    const [logs, setLogs] = useState([
        { id: 1, timestamp: '2024-06-01 10:00', user: 'Dr. John Doe', action: 'Updated patient record', details: 'Updated record for patient ID 123' },
        { id: 2, timestamp: '2024-05-30 14:30', user: 'Nurse Jane Smith', action: 'Added new patient', details: 'Added patient ID 456' }
    ]);

    // 필터 상태
    const [filter, setFilter] = useState({ user: '', action: '', dateFrom: '', dateTo: '' });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    };

    const handleExportLogs = () => {
        // 여기에 로그를 CSV 또는 Excel로 내보내는 로직을 추가합니다.
        console.log('Export logs to CSV or Excel');
    };

    return (
        <Container fluid>
            <Row className="my-3">
                <Col>
                    <h1>Data Management</h1>
                </Col>
            </Row>
            <Row className="my-3">
                <Col>
                    <Button variant="primary" className="me-2">Upload Data</Button>
                    <Button variant="success">Download Data</Button>
                </Col>
            </Row>
            <Row className="my-3">
                <Col>
                    <h2>Data Uploads</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {uploads.map(upload => (
                                <tr key={upload.id}>
                                    <td>{upload.date}</td>
                                    <td>{upload.type}</td>
                                    <td>{upload.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row className="my-3">
                <Col>
                    <h2>Audit Logs</h2>
                    <Form>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="filterUser">
                                    <Form.Label>User</Form.Label>
                                    <Form.Control type="text" name="user" value={filter.user} onChange={handleFilterChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="filterAction">
                                    <Form.Label>Action</Form.Label>
                                    <Form.Control type="text" name="action" value={filter.action} onChange={handleFilterChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="filterDateFrom">
                                    <Form.Label>Date From</Form.Label>
                                    <Form.Control type="date" name="dateFrom" value={filter.dateFrom} onChange={handleFilterChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="filterDateTo">
                                    <Form.Label>Date To</Form.Label>
                                    <Form.Control type="date" name="dateTo" value={filter.dateTo} onChange={handleFilterChange} />
                                </Form.Group>
                            </Col>
                            <Col className="d-flex align-items-end">
                                <Button variant="primary">Search</Button>
                            </Col>
                        </Row>
                    </Form>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Timestamp</th>
                                <th>User</th>
                                <th>Action</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map(log => (
                                <tr key={log.id}>
                                    <td>{log.timestamp}</td>
                                    <td>{log.user}</td>
                                    <td>{log.action}</td>
                                    <td>{log.details}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row className="my-3">
                <Col>
                    <Button variant="success" onClick={handleExportLogs}>Export Logs</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Data;
