import React from 'react';
import { Row, Col, Card, Dropdown } from "react-bootstrap";

const patientInfo = [
    { title: "PID", key: "patientId" },
    { title: "Name", key: "patientName" },
    { title: "Sex", key: "patientSex" },
    { title: "Birthday", key: "patientBirthdate" },
    { title: "Disease History", key: "patientDiseaseHistory" },
    { title: "Pain", key: "admissionPain" },
    { title: "Chief Complaint", key: "admissionChiefComplaint" }
];

const PatientInfo = ({ patientData }) => {

    return (
        <>
            <Col md={2} className="h-100">
                <Row className="d-flex text-center">
                    {patientInfo.slice(0, 6).map(info => (
                        <Col md={6} key={info.key} className="mb-2">
                            <Card className="w-100">
                                <Card.Body>
                                    <Card.Title>{info.title}</Card.Title>
                                    <Card.Text>{patientData.length && patientData[0][info.key]}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                    <Col>
                        <Card className="w-100">
                            <Card.Body>
                                <Card.Title>{patientInfo[6].title}</Card.Title>
                                <Card.Text>{patientData.length && patientData[0][patientInfo[6].key]}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </>
    );
}

export default PatientInfo;