import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Dropdown } from 'react-bootstrap';
import NcdssChart from './NcdssChart';
import DecisionDrop from '../../components/core/decisionmodal';
import CommentModal from '../../components/core/commentmodal';
import ResultWardTable from './ResultWardTable';
import CommentTable from './CommentTable';

const AdmissionInfo = ({ patientData, setPatientData, admissionList, patientId, admissionId, resultWardList, commentList, setResultWard, setComment }) => {

    const staffId = sessionStorage.getItem("staffId");

    return (
        <>
            <Col md={3} className="h-100">
                <Row>
                    <Col className="d-flex justify-content-between w-100 mb-2">
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    InTime
                                </Card.Title>
                                <Card.Text>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="light">
                                            {`${patientData.length && patientData[0].admissionInTime.year}/${patientData.length && patientData[0].admissionInTime.month}/${patientData.length && patientData[0].admissionInTime.day} ${patientData.length && patientData[0].admissionInTime.hour}:${patientData.length && patientData[0].admissionInTime.minute}`}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {admissionList.map((admission, index) => (
                                                <Dropdown.Item key={index} href='#' onClick={() => { window.location.href = `http://localhost:3000/Detail/${patientId}/${admission.admissionId}` }}>{`${admission.admissionInTime.year}/${admission.admissionInTime.month}/${admission.admissionInTime.day} ${admission.admissionInTime.hour}:${admission.admissionInTime.minute}`}</Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    OutTime
                                </Card.Title>
                                <Card.Text>
                                    {`${patientData.length && patientData[0].admissionOutTime.year}/${patientData.length && patientData[0].admissionOutTime.month}/${patientData.length && patientData[0].admissionOutTime.day} ${patientData.length && patientData[0].admissionOutTime.hour}:${patientData.length && patientData[0].admissionOutTime.minute}`}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="d-flex flex-column g-3">
                    <Col md={6} className="w-100">
                        <Card className="w-100">
                            <Card.Body className="w-100">
                                <NcdssChart patientData={patientData} />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} className="w-100">
                        <Card>
                            <Card.Body>
                                <Card.Text>
                                    <ResultWardTable resultWardList={resultWardList} />
                                    <DecisionDrop staffId={staffId} admissionId={admissionId} setResultWard={setResultWard} />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} className="w-100">
                        <Card>
                            <Card.Body>
                                <Card.Text>
                                    <CommentTable commentList={commentList} />
                                    <CommentModal staffId={staffId} admissionId={admissionId} setComment={setComment} />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </>);
}

export default AdmissionInfo;