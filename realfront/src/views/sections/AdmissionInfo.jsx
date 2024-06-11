import React from 'react';
import { Row, Col, Card, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NcdssChart from './NcdssChart';
import DecisionDrop from '../../components/core/decisionmodal';
import CommentModal from '../../components/core/commentmodal';
import ResultWardTable from './ResultWardTable';
import CommentTable from './CommentTable';

const AdmissionInfo = ({ patientData, setPatientData, admissionList, patientId, admissionId, resultWardList, commentList, setResultWard, setComment }) => {

    const navigate = useNavigate();
    const staffId = sessionStorage.getItem("staffId");

    return (
        <>
            <Col md={3} className="h-100">
                <Row>
                    <Col className="d-flex justify-content-between w-100 mb-3 text-center">
                        <Card style={{ height: '5.63rem', width: '13.8rem' }}>
                            <Card.Body>
                                <Card.Title className="m-0">
                                    InTime
                                </Card.Title>
                                <Card.Text className="" style={{  }}>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="white">
                                            {patientData[0] ? `${patientData[0].admissionInTime.year}.${patientData[0].admissionInTime.month}.${patientData[0].admissionInTime.day} ${patientData[0].admissionInTime.hour}:${patientData[0].admissionInTime.minute}` : "N/A"}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="text-center">
                                            {admissionList.map((admission, index) => (
                                                <Dropdown.Item key={index} href='#' onClick={() => { navigate(`/Detail/${patientId}/${admission.admissionId}`) }}>{admission ? `${admission.admissionInTime.year}.${admission.admissionInTime.month}.${admission.admissionInTime.day} ${admission.admissionInTime.hour}:${admission.admissionInTime.minute}` : "N/A"}</Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '13.8rem' }}>
                            <Card.Body>
                                <Card.Title>
                                    OutTime
                                </Card.Title>
                                <Card.Text>
                                {patientData[0]?.admissionOutTime ? `${patientData[0].admissionOutTime.year}.${patientData[0].admissionOutTime.month}.${patientData[0].admissionOutTime.day} ${patientData[0].admissionOutTime.hour}:${patientData[0].admissionOutTime.minute}` : "N/A"}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="d-flex g-3 text-center">
                    <Col md={12} className="w-100">
                        <Card className="w-100" style={{ height: '15rem' }}>
                            <Card.Body className="w-100">
                                <NcdssChart patientData={patientData} />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={12} className="w-100">
                        <Card style={{ height: '14rem' }}>
                            <Card.Body>
                                <Card.Text>
                                    <ResultWardTable resultWardList={resultWardList} />
                                    <DecisionDrop staffId={staffId} admissionId={admissionId} setResultWard={setResultWard} />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={12} className="w-100">
                        <Card style={{ height: '14rem' }}>
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