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
                    <Col className="d-flex justify-content-between w-100 mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    InTime
                                </Card.Title>
                                <Card.Text>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="light">
                                            {`${String(patientData.length && patientData[0].admissionInTime.year).padStart(2, '0')}.${String(patientData.length && patientData[0].admissionInTime.month).padStart(2, '0')}.${String(patientData.length && patientData[0].admissionInTime.day).padStart(2, '0')} ${String(patientData.length && patientData[0].admissionInTime.hour).padStart(2, '0')}:${String(patientData.length && patientData[0].admissionInTime.minute).padStart(2, '0')}`}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="text-center">
                                            {admissionList.map((admission, index) => (
                                                <Dropdown.Item key={index} href='#' onClick={() => { window.location.href = `http://localhost:3000/Detail/${patientId}/${admission.admissionId}` }}>{`${String(admission.admissionInTime.year).padStart(2, '0')}.${String(admission.admissionInTime.month).padStart(2, '0')}.${String(admission.admissionInTime.day).padStart(2, '0')} ${String(admission.admissionInTime.hour).padStart(2, '0')}:${String(admission.admissionInTime.minute).padStart(2, '0')}`}</Dropdown.Item>
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