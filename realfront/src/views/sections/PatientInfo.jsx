import React from 'react';
import { Row, Col, Card, Dropdown } from "react-bootstrap";
import CommentModal from "../../components/core/commentmodal";

const patientInfo = [
    { title: "PID", key: "patientId" },
    { title: "Name", key: "patientName" },
    { title: "Sex", key: "patientSex" },
    { title: "Birthday", key: "patientBirthdate" },
    { title: "Disease History", key: "patientDiseaseHistory" }
];

const PatientInfo = ({ patientData, admissionList, patientId, admissionId }) => {

    if (!patientData || patientData.length === 0) {
        return <p>환자 정보가 없습니다</p>
    }

    const handleEdit = () => {

    }

    const handleDelete = () => {

    }

    return (
        <>
            <Col md={3}>
                <Card className="h-100">
                    <Card.Body>
                        <Card.Title className="d-flex justify-content-between align-items-center">
                            <span>Patient Detail</span>
                            <Dropdown>
                                <Dropdown.Toggle variant="light">
                                    {admissionId}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {admissionList.map((admission, index) => (
                                        <Dropdown.Item key={index} href='#' onClick={() => {window.location.href=`http://localhost:3000/Detail/${patientId}/${admission.admissionId}`}}>{admission.admissionId}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Card.Title>
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
                    <Col md={1} className="mb-4 w-100 h-100">
                        <Card>
                            <Card.Body>
                                <Card.Title>InTime</Card.Title>
                                <Card.Text>
                                    {`${patientData[0].admissionInTime.year}/${patientData[0].admissionInTime.month}/${patientData[0].admissionInTime.day} ${patientData[0].admissionInTime.hour}:${patientData[0].admissionInTime.minute}`}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={1} className="mb-4 w-100 h-100">
                        <Card>
                            <Card.Body>
                                <Card.Title>OutTime</Card.Title>
                                <Card.Text>
                                    {`${patientData[0].admissionOutTime.year}/${patientData[0].admissionOutTime.month}/${patientData[0].admissionOutTime.day} ${patientData[0].admissionOutTime.hour}:${patientData[0].admissionOutTime.minute}`}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} className="mb-4 w-100 h-100">
                        <Card>
                            <Card.Body>
                                <Card.Title>Ncdss</Card.Title>
                                <Card.Text>
                                    {patientData && patientData.length > 0 && patientData[patientData.length - 1].deepNcdss != null ? patientData[patientData.length - 1].deepNcdss : ''}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    {patientData && patientData.length > 0 && (patientData[patientData.length - 1].admissionResultWard && patientData[patientData.length - 1].admissionComment) ? (
                        <>
                            <Col md={3} className="mb-4 w-100 h-100">
                                <Card>
                                    <Card.Body>
                                        <Card.Title className="d-flex justify-content-between align-items-center">
                                            <span className="mx-auto">Disposition</span>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="light">

                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/edit" onClick={handleEdit}>Edit</Dropdown.Item>
                                                    <Dropdown.Item href="#/delete" onClick={handleDelete}>Delete</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Card.Title>
                                        <Card.Text>
                                            {patientData[patientData.length - 1].admissionResultWard}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4} className="mb-4 w-100 h-100">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Diagnosis</Card.Title>
                                        <Card.Text>
                                            About Patient..
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </>
                    ) : (<CommentModal />)}
                </Row>
            </Col>
        </>
    );
}

export default PatientInfo;