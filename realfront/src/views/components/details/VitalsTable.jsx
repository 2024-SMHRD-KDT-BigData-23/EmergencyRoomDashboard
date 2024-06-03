import React from 'react';
import { Table } from 'react-bootstrap';

function VitalsTable({ vitals }) {
  return (
    <Table striped bordered hover variant="white">
      <tbody>
        <tr>
          <td>
            {vitals.patientVitalCreatedAt.substring(0, 10)}<br/>
            {vitals.patientVitalCreatedAt.substring(11, 16)}<br/>
            {vitals.patientVitalCreatedAt.substring(17)}
          </td>
        </tr>
        <tr><td>{vitals.patientVitalTemperature}</td></tr>
        <tr><td>{vitals.patientVitalHr}</td></tr>
        <tr><td>{vitals.patientVitalRespiratoryRate}</td></tr>
        <tr><td>{vitals.patientVitalSpo2}</td></tr>
        <tr><td>{vitals.patientVitalNibpS}</td></tr>
        <tr><td>{vitals.patientVitalNibpD}</td></tr>
      </tbody>
    </Table>
  );
}

export default VitalsTable;