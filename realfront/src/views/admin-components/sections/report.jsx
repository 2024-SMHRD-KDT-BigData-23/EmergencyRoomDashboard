import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Report = () => {
    const [reportType, setReportType] = useState("userActivity");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleDownload = () => {
        // 보고서 다운로드 로직을 구현하세요
        alert(`Downloading ${reportType} report from ${startDate} to ${endDate}`);
    };

    return (
        <Container>
            <Row className="my-4">
                <Col>
                    <h1>Report Page</h1>
                    <Form>
                        <Form.Group controlId="reportType" className="mb-3">
                            <Form.Label>보고서 종류 선택:</Form.Label>
                            <Form.Control 
                                as="select" 
                                value={reportType} 
                                onChange={(e) => setReportType(e.target.value)}
                            >
                                <option value="userActivity">사용자 활동 보고서</option>
                                <option value="systemUsage">시스템 사용 보고서</option>
                                <option value="patientCare">환자 진료 보고서</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="startDate" className="mb-3">
                            <Form.Label>보고서 시작 날짜:</Form.Label>
                            <Form.Control 
                                type="date" 
                                value={startDate} 
                                onChange={(e) => setStartDate(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group controlId="endDate" className="mb-3">
                            <Form.Label>보고서 종료 날짜:</Form.Label>
                            <Form.Control 
                                type="date" 
                                value={endDate} 
                                onChange={(e) => setEndDate(e.target.value)} 
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleDownload}>보고서 다운로드</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Report;
