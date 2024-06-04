import React, { useState } from "react";
import { Container, Row, Col, Table, Button} from 'react-bootstrap';

const Data = () => {
    // 데이터 업로드 상태
    const [uploads, setUploads] = useState([
        { id: 1, date: '2024-06-01', type: 'Patient Data', status: 'Completed' },
        { id: 2, date: '2024-05-30', type: 'Medical Records', status: 'Pending' },
        { id: 3, date: '2024-06-02', type: 'Lab Results', status: 'Completed' },
        { id: 4, date: '2024-05-29', type: 'Radiology Images', status: 'Failed' },
        { id: 5, date: '2024-06-03', type: 'Prescription Data', status: 'Completed' },
        { id: 6, date: '2024-06-01', type: 'Discharge Summary', status: 'Pending' },
        { id: 7, date: '2024-05-28', type: 'Clinical Notes', status: 'Completed' },
        { id: 8, date: '2024-06-04', type: 'Surgery Reports', status: 'Pending' },
        { id: 9, date: '2024-06-04', type: 'Allergy Information', status: 'Completed' },
        { id: 10, date: '2024-05-27', type: 'Immunization Records', status: 'Completed' },
        { id: 11, date: '2024-06-02', type: 'Vital Signs', status: 'Failed' },
        { id: 12, date: '2024-06-01', type: 'Emergency Contacts', status: 'Completed' }
    ]);

    

   

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
           
        </Container>
    );
};

export default Data;
