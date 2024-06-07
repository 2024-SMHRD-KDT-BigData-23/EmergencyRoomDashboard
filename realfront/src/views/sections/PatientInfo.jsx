import React from 'react';
import { Row, Col, Card, Dropdown } from "react-bootstrap";

const patientInfo = [
    { title: "PID", key: "patientId" },
    { title: "Name", key: "patientName" },
    { title: "Sex", key: "patientSex" },
    { title: "Birthday", key: "patientBirthdate" },
    { title: "Disease History", key: "patientDiseaseHistory" }
];

const PatientInfo = ({ patientData, admissionList, patientId, admissionId }) => {

    return (
        <>
            <Col md={2} className="h-100">
                <Row className="d-flex flex-column g-4 text-center">
                    <Col>
                        <Dropdown>
                            <Dropdown.Toggle variant="light">
                                {admissionId}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {admissionList.map((admission, index) => (
                                    <Dropdown.Item key={index} href='#' onClick={() => { window.location.href = `http://localhost:3000/Detail/${patientId}/${admission.admissionId}` }}>{admission.admissionId}</Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    {patientInfo.map(info => (
                        <Col className="h-100">
                            <Card key={info.key} className="w-100">
                                <Card.Body>
                                    <Card.Title>{info.title}</Card.Title>
                                    <Card.Text>{patientData.length && patientData[0][info.key]}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Col>
        </>
    );
}

export default PatientInfo;