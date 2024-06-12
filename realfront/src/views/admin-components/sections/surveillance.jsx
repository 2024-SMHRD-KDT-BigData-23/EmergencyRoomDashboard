import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import axios from "axios";

const Suveillance = ({ patient, setSearch }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12; // 한 페이지에 표시할 항목 수


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPatientItems = patient.slice(indexOfFirstItem, indexOfLastItem);

    const totalActivityPages = Math.ceil(patient.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const getPagination = (totalPages) => {
        const pageNumbers = [];
        let startPage, endPage;

        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalActivityPages) {
            setCurrentPage(currentPage + 1);
        }
    };

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
        <Container className="p-2">
            <Row>
                <Col>
                    <h2>Audit Logs</h2>
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="filterUser">
                                    <Form.Label>Id</Form.Label>
                                    <Form.Control type="text" name="logUser" value={filter.logUser} onChange={handleFilterChange} 
                                    placeholder="Search Id..." />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="filterAction">
                                    <Form.Label>Action</Form.Label>
                                    <Form.Select
                                        name="logAction"
                                        value={filter.logAction}
                                        onChange={handleFilterChange}
                                    >
                                    <option value="All action">All action</option>    
                                    <option value="login">Login</option>
                                    <option value="logout">Logout</option>
                                    <option value="Decision">Decision</option>
                                    </Form.Select>
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
                            <Col className="d-flex align-items-end SurCsvBtn justify-content-end">
                                <Button variant="success" onClick={handleExportLogs}>Export Logs</Button>
                            </Col>
                        </Row>
                    </Form>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Timestamp</th>
                                <th>Id</th>
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
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                                <button onClick={() => setCurrentPage(1)} className="page-link">{"<<"}</button>
                            </li>
                            <li className="page-item">
                                <button onClick={handlePrev} className="page-link">{"<"}</button>
                            </li>
                            {getPagination(totalActivityPages).map(number => (
                                <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                    <button onClick={() => paginate(number)} className="page-link">{number}</button>
                                </li>
                            ))}
                            {totalActivityPages > 10 && currentPage + 4 < totalActivityPages && (
                                <li className="page-item disabled">
                                    <span className="page-link">...</span>
                                </li>
                            )}
                            <li className="page-item">
                                <button onClick={handleNext} className="page-link">{">"}</button>
                            </li>
                            <li className="page-item">
                                <button onClick={() => setCurrentPage(totalActivityPages)} className="page-link">{">>"}</button>
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
export default Suveillance;
