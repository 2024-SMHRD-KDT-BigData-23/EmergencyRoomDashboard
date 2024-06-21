import React from 'react';
import { Col, Button, Dropdown } from 'react-bootstrap';

function PatientInfo({ patientData, navigate }) {
  return (
    <>
      <Col>
        <Button variant="outline-secondary" onClick={() => navigate('/List')}>뒤로가기</Button>
      </Col>
      <Col>P-ID {patientData.patientId}</Col>
      <Col>Name {patientData.patientName}</Col>
      <Col>Sex {patientData.patientSex}</Col>
      <Col>NTAS {patientData.deepNcdss}</Col>
      <Col>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary">
            {patientData.admissionInTime}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#">Action</Dropdown.Item>
            <Dropdown.Item href="#">Another action</Dropdown.Item>
            <Dropdown.Item href="#">Something else here</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </>
  );
}

export default PatientInfo;