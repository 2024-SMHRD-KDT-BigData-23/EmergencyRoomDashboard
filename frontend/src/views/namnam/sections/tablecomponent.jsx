import React, { useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Container, Row, Col } from 'reactstrap';
import  '../../../assets/scss/table.scss';

const ItemTypes = {
  PATIENT: 'patient',
};

const PatientCard = ({ patient }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: ItemTypes.PATIENT,
      item: { id: patient.id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));
  
    return (
      <div ref={drag} className={`patient-card ${isDragging ? 'dragging' : ''}`}>
        <p>{patient.name}</p>
        <p>{patient.gender}</p>
        <p>{patient.age}</p>
      </div>
    );
  };

  const PatientArea = ({ title, patients, setPatients, movePatient }) => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: ItemTypes.PATIENT,
      drop: (item) => movePatient(item.id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));
  
    return (
      <div ref={drop} className={`patient-area ${isOver ? 'over' : ''}`}>
        <h3>{title}</h3>
        {patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>
    );
  };

  const TableComponent = () => {
    const [patientsA, setPatientsA] = useState([
      { id: 1, name: '김동완', gender: 'male', age: 28 },
      // Add more patients here
    ]);
  
    const [patientsB, setPatientsB] = useState([
      { id: 2, name: 'John Doe', gender: 'male', age: 30 },
      // Add more patients here
    ]);
  
    const movePatient = (id, from, to) => {
      let patient;
      if (from === 'A') {
        patient = patientsA.find((p) => p.id === id);
        setPatientsA((prev) => prev.filter((p) => p.id !== id));
        setPatientsB((prev) => [...prev, patient]);
      } else {
        patient = patientsB.find((p) => p.id === id);
        setPatientsB((prev) => prev.filter((p) => p.id !== id));
        setPatientsA((prev) => [...prev, patient]);
      }
    };
  
    return (
      <DndProvider backend={HTML5Backend}>
        <Container>
          <Row>
            <Col>
              <PatientArea title="응급환자 진료구역 A" patients={patientsA} setPatients={setPatientsA} movePatient={(id) => movePatient(id, 'B', 'A')} />
            </Col>
            <Col>
              <PatientArea title="중증응급환자 진료구역 B" patients={patientsB} setPatients={setPatientsB} movePatient={(id) => movePatient(id, 'A', 'B')} />
            </Col>
          </Row>
        </Container>
      </DndProvider>
    );
  };

export default TableComponent;
