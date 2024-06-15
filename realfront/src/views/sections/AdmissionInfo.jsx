import React from 'react';
import { Row, Col, Card, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NcdssChart from './NcdssChart';
import ResultWardTable from './ResultWardTable';
import CommentTable from './CommentTable';
import ResultWardButtons from './ResultWardButtons';
import CommentForm from './CommentForm';
import usePagination from '../../hooks/usePagination';

const AdmissionInfo = ({ patientData, admissionList, patientId, admissionId, selectedPointIndex, resultWardList, commentList, resultWard, setResultWard, comment, setComment }) => {

    const navigate = useNavigate();
    const staffId = sessionStorage.getItem("staffId");
    const { currentItems: resultWardItems, pageNumbers: resultWardPageNumbers, prevPage: resultWardPrevPage, nextPage: resultWardNextPage } = usePagination(resultWardList, 3);
    const { currentItems: commentItems, pageNumbers: commentPageNumbers, prevPage: commentPrevPage, nextPage: commentNextPage } = usePagination(commentList, 3);

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
                                <Card.Text className="" style={{}}>
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
                                <NcdssChart patientData={patientData} selectedPointIndex={selectedPointIndex} />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={12} className="w-100">
                        <Card style={{ height: '14rem' }}>
                            <Card.Body className="d-flex flex-column justify-content-between p-0">
                                <ResultWardTable currentItems={resultWardItems} />
                            </Card.Body>
                            <Card.Footer className="p-1 d-flex justify-content-between">
                                <ResultWardButtons pageNumbers={resultWardPageNumbers} prevPage={resultWardPrevPage} nextPage={resultWardNextPage} staffId={staffId} admissionId={admissionId} resultWard={resultWard} setResultWard={setResultWard} />
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col md={12} className="w-100">
                        <Card style={{ height: '14rem' }}>
                            <Card.Body className="d-flex flex-column justify-content-between p-0">
                                <CommentTable currentItems={commentItems} />
                            </Card.Body>
                            <Card.Footer className="p-1 d-flex justify-content-between">
                                <CommentForm pageNumbers={commentPageNumbers} prevPage={commentPrevPage} nextPage={commentNextPage} staffId={staffId} admissionId={admissionId} comment={comment} setComment={setComment} />
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </>);
}

export default AdmissionInfo;