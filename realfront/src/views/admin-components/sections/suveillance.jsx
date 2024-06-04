import React, { useState } from "react";
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';

const Suveillance =()=>{
    // 감사 로그 상태
    const [logs, setLogs] = useState([
        { id: 1, timestamp: '2024-06-01 10:00', user: 'Dr. John Doe', action: 'Updated patient record', details: 'Updated record for patient ID 123' },
        { id: 2, timestamp: '2024-05-30 14:30', user: 'Nurse Jane Smith', action: 'Added new patient', details: 'Added patient ID 456' },
        { id: 3, timestamp: '2024-06-02 09:15', user: 'Dr. Emily Clark', action: 'Reviewed lab results', details: 'Reviewed lab results for patient ID 789' },
        { id: 4, timestamp: '2024-05-29 12:45', user: 'Nurse Mark Johnson', action: 'Scheduled surgery', details: 'Scheduled surgery for patient ID 321' },
        { id: 5, timestamp: '2024-06-03 11:00', user: 'Dr. Sarah Lee', action: 'Prescribed medication', details: 'Prescribed medication for patient ID 654' },
        { id: 6, timestamp: '2024-06-01 15:30', user: 'Nurse Paul Davis', action: 'Discharged patient', details: 'Discharged patient ID 987' },
        { id: 7, timestamp: '2024-05-28 08:00', user: 'Dr. Michael Brown', action: 'Updated clinical notes', details: 'Updated clinical notes for patient ID 432' },
        { id: 8, timestamp: '2024-06-04 13:00', user: 'Nurse Lisa Wilson', action: 'Uploaded surgery report', details: 'Uploaded surgery report for patient ID 876' },
        { id: 9, timestamp: '2024-06-04 07:45', user: 'Dr. Robert White', action: 'Reviewed allergy information', details: 'Reviewed allergy information for patient ID 543' },
        { id: 10, timestamp: '2024-05-27 16:20', user: 'Nurse Karen Martinez', action: 'Updated immunization records', details: 'Updated immunization records for patient ID 210' },
        { id: 11, timestamp: '2024-06-02 14:10', user: 'Dr. David Harris', action: 'Checked vital signs', details: 'Checked vital signs for patient ID 678' },
        { id: 12, timestamp: '2024-06-01 09:50', user: 'Nurse Nancy Evans', action: 'Added emergency contact', details: 'Added emergency contact for patient ID 334' }
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


    return(
        <Container>
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
    )
}
export default Suveillance;