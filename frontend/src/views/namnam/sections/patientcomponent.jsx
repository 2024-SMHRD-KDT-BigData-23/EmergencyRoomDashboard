import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'reactstrap';
import '../../../assets/scss/list.scss'; 
// import axios from 'axios';


const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // 실제 데이터 API를 호출하여 데이터를 가져오는 대신 가짜 데이터를 사용합니다.
    // axios.get('http://localhost:8080/api/patients')
    //   .then(response => {
    //     setPatients(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching data: ', error);
    //   });

    // 가짜 데이터
    const fakeData = [
      { id: 1, name: '김동완', code: 'qaeer3555123qweqe1', sex: 'male', hospitalizationDay: '2024.05.16', acuity: 23 },
      { id: 2, name: '정연재', code: 'ewqre341423weeqwe', sex: 'male', hospitalizationDay: '2024.01.14', acuity: 74 },
      { id: 3, name: '이병헌', code: 'weqrq34235weewweq', sex: 'male', hospitalizationDay: '2024.03.16', acuity: 43 },
      // 추가 환자 데이터...
    ];

    setPatients(fakeData);
  }, []);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg="10" md="12" className="align-self-center">
          <h3 className="title text-center">환자 리스트</h3>
          <Table bordered className="patient-table">
            <thead>
              <tr>
                <th>NAME</th>
                <th>CODE</th>
                <th>SEX</th>
                <th>Hospitalization day</th>
                <th>Acuity</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(patient => (
                <tr key={patient.id}>
                  <td>{patient.name}</td>
                  <td>{patient.code}</td>
                  <td>{patient.sex}</td>
                  <td>{patient.hospitalizationDay}</td>
                  <td style={{ color: getColorByAcuity(patient.acuity) }}>{patient.acuity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

const getColorByAcuity = (acuity) => {
  if (acuity < 20) return 'green';
  if (acuity < 50) return 'orange';
  if (acuity < 80) return 'yellow';
  return 'red';
};

export default PatientList;
