import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import axios from "axios";

const Surveillance = ({ resultWardList, setSearch, handlePageChange, page}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // 한 페이지에 표시할 항목 수

    console.log('page값3 : ',page)

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPatientItems = resultWardList.slice(indexOfFirstItem, indexOfLastItem);
    // const currentActivityItems = loginList.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const patientPageNumbers = [];
    for (let i = 1; i <= Math.ceil(resultWardList.length / itemsPerPage); i++) {
        patientPageNumbers.push(i);
    }

    // const activityPageNumbers = [];
    // for (let i = 1; i <= Math.ceil(loginList.length / itemsPerPage); i++) {
    //     activityPageNumbers.push(i);
    // }

    const [filter, setFilter] = useState({
        staffId: '',
        ResultWard: '',
        OutTimeStart: '',
        OutTimeEnd: ''
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch(filter);
    };

    const handleExportLogs = () => {
        console.log('Export logs to CSV or Excel');
    };

    return (
        <Container>
            <Row className="my-3">
                <Col>
                    <h2>Audit Logs</h2>
                    <Row className="my-3">
                        <Col>
                            <Button variant="primary" className="me-2" onClick={() => handlePageChange('login')}>login log</Button>
                            <Button variant="success" onClick={() => handlePageChange('resultWard')}>resultWard log</Button>
                        </Col>
                    </Row>
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="filterUser">
                                    <Form.Label>User</Form.Label>
                                    <Form.Control type="text" name="staffId" value={filter.staffId} onChange={handleFilterChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="filterAction">
                                    <Form.Label>Action</Form.Label>
                                    <Form.Control type="text" name="ResultWard" value={filter.ResultWard} onChange={handleFilterChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="filterDateFrom">
                                    <Form.Label>Date From</Form.Label>
                                    <Form.Control type="date" name="OutTimeStart" value={filter.OutTimeStart} onChange={handleFilterChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="filterDateTo">
                                    <Form.Label>Date To</Form.Label>
                                    <Form.Control type="date" name="OutTimeEnd" value={filter.OutTimeEnd} onChange={handleFilterChange} />
                                </Form.Group>
                            </Col>
                            <Col className="d-flex align-items-end">
                                <Button variant="primary" type="submit">Search</Button>
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
                        {page === 'resultWard' ? (
                        <tbody>
                            {currentPatientItems.map(patient => (
                                <tr key={patient.id}>
                                    <td>{String(patient.resultWardUpdatedAt.year).padStart(2, '0')}.{String(patient.resultWardUpdatedAt.month).padStart(2, '0')}.{String(patient.resultWardUpdatedAt.day).padStart(2, '0')}
                                    .{String(patient.resultWardUpdatedAt.hour).padStart(2, '0')}:{String(patient.resultWardUpdatedAt.minute).padStart(2, '0')}:{String(patient.resultWardUpdatedAt.second).padStart(2, '0')}</td>
                                    <td>{patient.staffId}</td>
                                    <td>{patient.resultWard}</td>
                                    <td>
                                        admission_id = {patient.admissionId}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        ):(
                        <tbody>
                            {currentPatientItems.map(activity => (
                                <tr key={activity.id}>
                                    <td>{new Date(activity.activityDate).toLocaleString()}</td>
                                    <td>{activity.staffInfo.staffId}</td>
                                    <td>{activity.activityType}</td>
                                    <td>
                                        Activity Type: {activity.activityType}
                                    </td>
                                </tr>
                            ))}
                        </tbody>)}
                    </Table>

                    <div style={{ textAlign: 'center' }}>
                        <ul className="pagination justify-content-center" >
                            {patientPageNumbers.map(number => (
                                <li key={number} className="page-item">
                                    <button onClick={() => paginate(number)} className="page-link" >
                                        {number}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Col>
            </Row>
            <Row className="my-3">
                <Col>
                    <Button variant="success" onClick={handleExportLogs}>Export Logs</Button>
                </Col>
            </Row>
        </Container>
    );
}
export default Surveillance;
