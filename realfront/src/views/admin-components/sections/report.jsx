import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from "axios";

const Report = () => {
    const [reportType, setReportType] = useState("userActivity");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleDownload =async () => {
        try{
            const response = await axios.get('http://localhost:8080/api/pdf/generate',{
                params:{
                    reportType,
                    startDate,
                    endDate
                },
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link =document.createElement('a');
            link.href =url;
            link.setAttribute('download','report.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
            alert('다운로드 완료');
        } catch (error){
            console.error('Error downloading report:',error);
            alert('다운르도 실패');
        }
    };

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${reportType}_report.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading report:', error);
        }
    };
    return (
        <Container>
            <Row className="my-4">
                    <div>
                    <div className="reportTitle">Report Download</div>
                    </div>
                <Col className="d-flex align-items-center justify-content-center">
                    <Form>
                        <Form.Group controlId="reportType" className="mb-3">
                            <Form.Label>보고서 종류 선택:</Form.Label>
                            <Form.Select
                                value={reportType} 
                                onChange={(e) => setReportType(e.target.value)}
                                style={{width : '35rem'}}
                            >
                                <option value="userActivity">사용자 활동 보고서</option>
                                <option value="systemUsage">시스템 사용 보고서</option>
                                <option value="patientCare">환자 진료 보고서</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="startDate" className="mb-3">
                            <Form.Label>보고서 시작 날짜:</Form.Label>
                            <Form.Control 
                                type="date" 
                                value={startDate} 
                                onChange={(e) => setStartDate(e.target.value)} 
                                style={{width : '35rem'}}
                            />
                        </Form.Group>
                        <Form.Group controlId="endDate" className="mb-3">
                            <Form.Label>보고서 종료 날짜:</Form.Label>
                            <Form.Control 
                                type="date" 
                                value={endDate} 
                                onChange={(e) => setEndDate(e.target.value)} 
                                style={{width : '35rem'}}
                            />
                        </Form.Group>
                        <Col className="d-flex justify-content-start">
                        <Button variant="primary" onClick={handleDownload}>Download</Button>
                        </Col>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Report;
