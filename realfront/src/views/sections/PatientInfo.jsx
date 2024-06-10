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
                <Row className="d-flex flex-column">
                    {patientInfo.slice(0, 4).map(info => (
                        <Col key={info.key} className="mb-3">
                            <Card className="w-100">
                                <Card.Body className="d-flex justify-content-between">
                                    <Card.Title>{info.title}</Card.Title>
                                    <Card.Text>{patientData.length && patientData[0][info.key]}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                    <Col className="mb-3">
                        <Card className="w-100">
                            <Card.Body>
                                <Card.Title>{patientInfo[4].title}</Card.Title>
                                <Card.Text className="text-center">{patientData.length && patientData[0][patientInfo[4].key]}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="w-100">
                            <Card.Body>
                                <Card.Title className="d-flex justify-content-between">
                                    <Card.Title>{patientInfo[5].title}</Card.Title>
                                    <Card.Text>{`${patientData.length && patientData[0][patientInfo[5].key]}/10`}</Card.Text>
                                </Card.Title>
                                <Card.Text className="text-center">{patientData.length && patientData[0][patientInfo[6].key]}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </>
    );
}

export default PatientInfo;
