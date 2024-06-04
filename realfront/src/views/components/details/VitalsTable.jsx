import React, { useEffect, useRef } from 'react';
import { Col, Table } from 'react-bootstrap';

function VitalsTable({ patientData }) {

  const tableContainerRef = useRef(null);

  const tableScrollLeft = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const tableScrollRight = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };


  useEffect(() => {
    if (patientData.length > 0) {
      const tableContainer = tableContainerRef.current;

      if (tableContainer) {
        tableContainer.scrollLeft = tableContainer.scrollWidth - tableContainer.clientWidth;
      }
    }
  }, [patientData]);

  return (
    <>
      <Col xs={3} className="p-0 m-0 d-flex flex-column aling-items-stretch">
        <Table bordered hover variant="light" className="flex-grow-1">
          <tbody>
            <tr><td><br />Measured Time<br /><br /></td></tr>
            <tr><td>Temp</td></tr>
            <tr><td>HR</td></tr>
            <tr><td>RR</td></tr>
            <tr><td>SPO2</td></tr>
            <tr><td>SBP</td></tr>
            <tr><td>DBP</td></tr>
          </tbody>
        </Table>
      </Col>
      <Col xs={9} className="p-0 m-0 d-flex bg-light">
        <div onClick={tableScrollLeft} className="d-flex align-items-center justify-content-center h-100" style={{ cursor: 'pointer', flex: '0 0 50px' }}>
          <span>&lt;&lt;</span>
        </div>
        <div className="tableContainer flex-grow-1" ref={tableContainerRef} style={{ overflowX: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="talbeContainerBody" style={{ width: '100vw', height: '30vh' }}>
            <Table responsive bordered hover variant="white" className="d-flex justify-content-between">
              {patientData && patientData.map((vital, index) => (
                <tbody key={index}>
                  <tr>
                    <td>
                      {vital.patientVitalCreatedAt.year}<br />
                      {vital.patientVitalCreatedAt.month + "/" + vital.patientVitalCreatedAt.day}<br />
                      {vital.patientVitalCreatedAt.hour + ":" + vital.patientVitalCreatedAt.minute + ":" + vital.patientVitalCreatedAt.second}
                    </td>
                  </tr>
                  <tr><td>{vital.patientVitalTemperature}</td></tr>
                  <tr><td>{vital.patientVitalHr}</td></tr>
                  <tr><td>{vital.patientVitalRespiratoryRate}</td></tr>
                  <tr><td>{vital.patientVitalSpo2}</td></tr>
                  <tr><td>{vital.patientVitalNibpS}</td></tr>
                  <tr><td>{vital.patientVitalNibpD}</td></tr>
                </tbody>
              ))}
            </Table>
          </div>
        </div>
        <div onClick={tableScrollRight} className="d-flex align-items-center justify-content-center h-100" style={{ cursor: 'pointer', flex: '0 0 50px' }}>
          <span>&gt;&gt;</span>
        </div>
      </Col>
    </>
  );
}

export default VitalsTable;