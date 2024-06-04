import React from 'react';
import { Row, Col, Card } from "react-bootstrap";

const patientInfo = [
    { title: "PID", key: "patientId" },
    { title: "Name", key: "patientName" },
    { title: "Sex", key: "patientSex" },
    { title: "Birthday", key: "patientBirthdate" },
    { title: "Disease History", key: "patientDiseaseHistory" }
];

const PatientInfo = ({ patientData }) => {

    if (!patientData || patientData.length === 0) {
        return <p>환자 정보가 없습니다</p>
    }

    return (
        <>
            <Col md={3}>
                <Card className="h-100">
                    <Card.Body>
                        <Card.Title>Patient Detail</Card.Title>
                        <Card.Text className="d-flex flex-column justify-content-evenly align-items-center text-center h-100">
                            {patientInfo.map(info => (
                                <Card key={info.key} className="w-100">
                                    <Card.Body>
                                        <Card.Title>{info.title}</Card.Title>
                                        <Card.Text>{patientData[0][info.key]}</Card.Text>
                                    </Card.Body>
                                </Card>
                            ))}
                        </Card.Text>
                    </Card.Body>
                </Card >
            </Col>
            <Col md={2}>
                <Row className="d-flex flex-column justify-content-center align-items-stretch text-center">
                    <Col md={4} className="mb-4 w-100 h-100">
                        <Card>
                            <Card.Body>
                                <Card.Title>Ncdss</Card.Title>
                                <Card.Text>
                                    {patientData && patientData.length > 0 && patientData[patientData.length - 1].deepNcdss != null ? patientData[patientData.length - 1].deepNcdss : ''}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4 w-100 h-100">
                        <Card>
                            <Card.Body>
                                <Card.Title>Disposition</Card.Title>
                                <Card.Text>
                                    {patientData && patientData.length > 0 ? patientData[patientData.length - 1].admissionResultWard : ''}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4 w-100 h-100">
                        <Card>
                            <Card.Body>
                                <Card.Title>Comment</Card.Title>
                                <Card.Text>
                                    About Patient..
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