import React, { useState } from "react";
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';

const Suveillance =({patients} , {setSearch})=>{

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 14; // 한 페이지에 표시할 항목 수

    // 현재 페이지에 표시할 데이터를 계산합니다.
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = patients.slice(indexOfFirstItem, indexOfLastItem);

    // 페이지를 변경하는 함수입니다.
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // 총 페이지 수를 계산하고 페이지 번호를 배열에 저장합니다.
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(patients.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }


    // 검색 관련
    const [filter, setFilter] = useState({
        staffId:'null',
        ResultWard:'null',
        OutTimeStart:'null',
        OutTimeEnd:'null'
    })
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch(filter);
    }


    const handleExportLogs = () => {
        // 여기에 로그를 CSV 또는 Excel로 내보내는 로직을 추가합니다.
        console.log('Export logs to CSV or Excel');
    };


    return(
        <Container>
             <Row className="my-3">
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
                            {currentItems.map(patient => (
                                <tr key={patient.id}>
                                    <td>{String(patient.admissionInTime.year).padStart(2, '0')}.{String(patient.admissionInTime.month).padStart(2, '0')}.{String(patient.admissionInTime.day).padStart(2, '0')}
                                    .{String(patient.admissionInTime.hour).padStart(2, '0')}:{String(patient.admissionInTime.minute).padStart(2, '0')}:{String(patient.admissionInTime.second).padStart(2, '0')}</td>
                                    <td>{patient.admissionStaffId}</td>
                                    <td>{patient.admissionResultWard}</td>
                                    <td>
                                        patient_id = {patient.patientId}  /  admission_id = {patient.admissionId}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    
                    <div style={{ textAlign: 'center' }}>
                        <ul className="pagination justify-content-center" >
                            {pageNumbers.map(number => (
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
    )
}
export default Suveillance;