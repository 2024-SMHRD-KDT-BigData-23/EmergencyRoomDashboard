import { Dropdown, DropdownButton } from "react-bootstrap";
import React from "react";
import axios from 'axios';

const DecisionDrop = ({ staffId, admissionId, updateAdmissionResultWard }) => {
    
    const handleResultWard = (eventKey) => {
        axios.post(`http://localhost:8080/api/ER/resultWards/${staffId}/${admissionId}`, {
            resultWard: eventKey
        })
            .then(response => {
                console.log('DB 업데이트 성공:', response.data);
                updateAdmissionResultWard(admissionId, response.data.resultWard);
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
            <Dropdown.Item eventKey="ICU">ICU</Dropdown.Item>
        </DropdownButton>
    );
};

export default DecisionDrop;