import { Dropdown, DropdownButton } from "react-bootstrap";
import React, { useState } from "react";
import axios from 'axios';

const DecisionDrop = ({ patientData, admissionId, updateAdmissionResultWard }) => {

    const [admissionResultWard, setAdmissionResultWard] = useState(patientData && patientData.length > 0 ? patientData[0].admissionResultWard : '');

    const handleResultWard = (eventKey) => {
        setAdmissionResultWard(eventKey);
        axios.patch(`http://localhost:8080/api/ER/set/medical-patients/${admissionId}`, {
            admissionResultWard: eventKey
        })
            .then(response => {
                console.log('DB 업데이트 성공:', response.data);
                updateAdmissionResultWard(admissionId, response.data.admissionResultWard);
            })
            .catch(error => {
                console.error('DB 업데이트 실패:', error);
            });
    };

    return (
        <DropdownButton
            title="Action"
            variant="warning"
            size="sm"
            onSelect={handleResultWard}
        >
            <Dropdown.Item eventKey="DISCHARGE">DISCHARGE</Dropdown.Item>
            <Dropdown.Item eventKey="WARD">WARD</Dropdown.Item>
            <Dropdown.Item eventKey="ICU" active>ICU</Dropdown.Item>
        </DropdownButton>
    );
};

export default DecisionDrop;