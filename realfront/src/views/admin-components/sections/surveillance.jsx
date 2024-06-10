import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import axios from "axios";

const Surveillance = ({ patient , setSearch}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // 한 페이지에 표시할 항목 수


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPatientItems = patient.slice(indexOfFirstItem, indexOfLastItem);
    // const currentActivityItems = loginList.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const patientPageNumbers = [];
    for (let i = 1; i <= Math.ceil(patient.length / itemsPerPage); i++) {
        patientPageNumbers.push(i);
    }

    // const activityPageNumbers = [];
    // for (let i = 1; i <= Math.ceil(loginList.length / itemsPerPage); i++) {
    //     activityPageNumbers.push(i);
    // }

    const [filter, setFilter] = useState({
        logUser: '',
        logAction: '',
        logTimeStart: '',
        logTimeEnd: ''
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
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="filterUser">
                                    <Form.Label>User</Form.Label>
                                    <Form.Control type="text" name="logUser" value={filter.logUser} onChange={handleFilterChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="filterAction">
                                    <Form.Label>Action</Form.Label>
                                    <Form.Control type="text" name="logAction" value={filter.logAction} onChange={handleFilterChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="filterDateFrom">
                                    <Form.Label>Date From</Form.Label>
                                    <Form.Control type="date" name="logTimeStart" value={filter.logTimeStart} onChange={handleFilterChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="filterDateTo">
                                    <Form.Label>Date To</Form.Label>
                                    <Form.Control type="date" name="logTimeEnd" value={filter.logTimeEnd} onChange={handleFilterChange} />
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
                        <tbody>
                            {currentPatientItems.map(patient => (
                                <tr key={patient.id}>
                                    <td>{String(patient.logTime.year).padStart(2, '0')}.{String(patient.logTime.month).padStart(2, '0')}.{String(patient.logTime.day).padStart(2, '0')}
                                    .{String(patient.logTime.hour).padStart(2, '0')}:{String(patient.logTime.minute).padStart(2, '0')}:{String(patient.logTime.second).padStart(2, '0')}</td>
                                    <td>{patient.logUser}</td>
                                    <td>
                                        {patient.logAction === 'login' || patient.logAction === 'logout' ? (
                                            <span>{patient.logAction}</span>
                                        ):(
                                            <span>Decision</span>

                                        )}
                                    </td>
                                    <td>
                                        {patient.logDetail === 'login' || patient.logDetail === 'logout' ? (
                                            <span>Stable {patient.logDetail}</span>
                                        ) : (
                                            <span>ResultWard : {patient.logAction} [ Patient_id : {patient.logDetail} ] </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
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
