import React from 'react';
import { Row, Col, Card } from "react-bootstrap";

const patientInfo = [
    { title: "PID", key: "patientId" },
    { title: "Name", key: "patientName" },
    { title: "Sex", key: "patientSex" },
    { title: "Birthday", key: "patientBirthdate" },
    { title: "Section", key: "bedWard"},
    { title: "Transport", key: "admissionArrivalTransport"},
    { title: "Disease History", key: "patientDiseaseHistory" },
    { title: "Chief Complaint", key: "admissionChiefComplaint" },
    { title: "Pain", key: "admissionPain" }
];

const PatientInfo = ({ patientData }) => {
    return (
        <>
            <Col md={2} className="h-100">
                <Row className="g-3">
                    {patientInfo.slice(0, 2).map(info => (
                        <Col md={6} key={info.key}>
                            <Card className="w-100" style={{ height: "5.63rem" }}>
                                <Card.Body>
                                    <Card.Title>{info.title}</Card.Title>
                                    <Card.Text>{patientData.length && patientData[0][info.key]}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                    {patientInfo.slice(2, 4).map(info => (
                        <Col md={6} key={info.key}>
                            <Card className="w-100">
                                <Card.Body>
                                    <Card.Title>{info.title}</Card.Title>
                                    <Card.Text>{patientData.length && patientData[0][info.key]}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                    {patientInfo.slice(4, 6).map(info => (
                        <Col md={6} key={info.key}>
                            <Card className="w-100">
                                <Card.Body>
                                    <Card.Title>{info.title}</Card.Title>
                                    <Card.Text>{patientData.length && patientData[0][info.key]}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                    {patientInfo.slice(6, 8).map(info => (
                        <Col md={12} key={info.key}>
                            <Card className="w-100" style={{ height: "10rem" }}>
                                <Card.Body>
                                    <Card.Title>{info.title}</Card.Title>
                                    <Card.Text>
                                        {patientData.length && patientData[0][info.key]}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                    <Col md={12} key={patientInfo[8].key}>
                        <Card className="w-100" style={{ height: "9.8rem" }}>
                            <Card.Body className="text-center">
                                <Card.Title>{patientInfo[8].title}</Card.Title>
                                <Card.Text className="align-center" style={{ fontWeight: '700', fontSize: '4rem', color: patientData.length && patientData[0][patientInfo[8].key] >= 7 ? 'red' : 'inherit' }}>
                                    {patientData.length && `${patientData[0][patientInfo[8].key]}`}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </>
    );
}

export default PatientInfo;
