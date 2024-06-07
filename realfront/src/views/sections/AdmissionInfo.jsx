import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import NcdssChart from './NcdssChart';
import DecisionDrop from '../../components/core/decisionmodal';
import DiagnosisModal from '../../components/core/diagnosismodal';

const AdmissionInfo = ({ patientData, setPatientData, admissionId }) => {

    const [updatedAdmissionId, setUpdatedAdmissionId] = useState(null);
    
    const updateAdmissionResultWard = (admissionId, newResultWard) => {
        setPatientData(prevData => {
            return prevData.map(patient => {
                if(patient.admissionId === admissionId) {
                    return { ...patient, admissionResultWard: newResultWard};
                }
                return patient;
            });
        });
        setUpdatedAdmissionId(admissionId);
    };

    const updateAdmissionDiagnosis = (admissionId, newDiagnosis) => {
        setPatientData(prevData => {
            return prevData.map(patient => {
                if (patient.admissionId === admissionId) {
                    return { ...patient, admissionDiagnosis: newDiagnosis };
                }
                return patient;
            });
        });
        setUpdatedAdmissionId(admissionId);
    };

    useEffect(() => {
        if (updatedAdmissionId !== null) {
            console.log(`admissionId ${updatedAdmissionId}의 진단 정보가 업데이트되었습니다.`);
            setUpdatedAdmissionId(null);
        }
    }, [updatedAdmissionId]);

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
                                    <DecisionDrop patientData={patientData} admissionId={admissionId} updateAdmissionResultWard={updateAdmissionResultWard} />
                                    {`${patientData.length && patientData[0].admissionResultWard}`}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} className="w-100">
                        <Card>
                            <Card.Body>
                                <Card.Title>Diagnosis</Card.Title>
                                <Card.Text>
                                    <DiagnosisModal patientData={patientData} admissionId={admissionId} updateAdmissionDiagnosis={updateAdmissionDiagnosis} />
                                    {`${patientData.length && patientData[0].admissionDiagnosis}`}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </>);
}

export default AdmissionInfo;