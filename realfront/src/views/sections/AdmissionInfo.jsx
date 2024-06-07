import { Row, Col, Card } from 'react-bootstrap';
import NcdssChart from './NcdssChart';
import DiagnosisModal from '../../components/core/diagnosismodal';

const AdmissionInfo = ({ patientData }) => {

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
                                    {`${patientData.length && patientData[0].admissionInTime.year}/${patientData.length && patientData[0].admissionInTime.month}/${patientData.length && patientData[0].admissionInTime.day} ${patientData.length && patientData[0].admissionInTime.hour}:${patientData.length && patientData[0].admissionInTime.minute}`}
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
                                <Card.Title>Result Ward</Card.Title>
                                <Card.Text>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} className="w-100">
                        <Card>
                            <Card.Body>
                                <Card.Title>Diagnosis</Card.Title>
                                <Card.Text>
                                    <DiagnosisModal />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </>);
}

export default AdmissionInfo;