import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import React from "react";

const DecisionDrop = () => {
    return (
        <DropdownButton
        title = "Action"
        variant="warning"
        size="sm"
        >  
            <Dropdown.Item eventKey="1">Discharge</Dropdown.Item>
            <Dropdown.Item eventKey="2">Ward</Dropdown.Item>
            <Dropdown.Item eventKey="3" active>ICU</Dropdown.Item>
          </DropdownButton>
    );
};

export default DecisionDrop;