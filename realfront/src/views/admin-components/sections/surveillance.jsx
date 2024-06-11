import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import axios from "axios";

const Suveillance = ({ patients = [], setSearch }) => {
    const [userActivities, setUserActivities] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12; // 한 페이지에 표시할 항목 수

    useEffect(() => {
        axios.get('http://localhost:8080/api/user-activity').then(response => {
            setUserActivities(response.data);
        }).catch(error => {
            console.error("There was an error fetching user activities!", error);
        });
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPatientItems = patients.slice(indexOfFirstItem, indexOfLastItem);
    const currentActivityItems = userActivities.slice(indexOfFirstItem, indexOfLastItem);

    const totalActivityPages = Math.ceil(userActivities.length / itemsPerPage);

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
        <Container className="p-2">
            <Row>
                <Col>
                    <h2>Audit Logs</h2>
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
                            <Col className="d-flex align-items-end SurCsvBtn justify-content-end">
                                <Button variant="success" onClick={handleExportLogs}>Export Logs</Button>
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
                                    <td>{String(patient.admissionInTime.year).padStart(2, '0')}.{String(patient.admissionInTime.month).padStart(2, '0')}.{String(patient.admissionInTime.day).padStart(2, '0')}
                                    .{String(patient.admissionInTime.hour).padStart(2, '0')}:{String(patient.admissionInTime.minute).padStart(2, '0')}:{String(patient.admissionInTime.second).padStart(2, '0')}</td>
                                    <td>{patient.staffId}</td>
                                    <td>{patient.admissionResultWard}</td>
                                    <td>
                                        patient_id = {patient.patientId}  /  admission_id = {patient.admissionId}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tbody>
                            {currentActivityItems.map(activity => (
                                <tr key={activity.id}>
                                    <td>{new Date(activity.activityDate).toLocaleString()}</td>
                                    <td>{activity.staffInfo.staffId}</td>
                                    <td>{activity.activityType}</td>
                                    <td>
                                        Activity Type: {activity.activityType}
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
