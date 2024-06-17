import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const Help = () => {
    const [ticket, setTicket] = useState({ issueType: '', description: '', contactInfo: '' });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTicket({ ...ticket, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://3.144.162.188:8080/api/sendEmail',ticket)
            .then(response =>{
                console.log('지원 티켓 제출 성공 !:',response.data);
                alert('티켓 제출 성공');
            })
            .catch(error => {
                console.error('지원 티켓 제출 실패 ㅠ:', error);
                alert('티켓 제출 실패');
            })
    };
    return (
        <Container fluid className="">
            
            {/* 섹션 */}
            <Row className="my-3">
                    <div>
                    <div className="SubmitTitle">Submit Ticket</div>
                    </div>
                <Col className="d-flex align-items-center justify-content-center">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="issueType" className="mb-3">
                            <Form.Label>문제 유형</Form.Label>
                            <Form.Select
                                name="issueType"
                                value={ticket.issueType}
                                onChange={handleInputChange}
                                style={{width : '35rem'}}
                            >
                                <option>선택...</option>
                                <option>계정 문제</option>
                                <option>시스템 오류</option>
                                <option>데이터 관련</option>
                                <option>기타</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="description" className="mb-3">
                            <Form.Label>설명</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={ticket.description}
                                onChange={handleInputChange}
                                rows={3}
                                placeholder="문제에 대한 자세한 설명을 입력하세요."
                                style={{width : '35rem'}}
                            />
                        </Form.Group>
                        <Form.Group controlId="contactInfo" className="mb-3">
                            <Form.Label>연락처 정보</Form.Label>
                            <Form.Control
                                type="text"
                                name="contactInfo"
                                value={ticket.contactInfo}
                                onChange={handleInputChange}
                                placeholder="연락 가능한 이메일 또는 전화번호를 입력하세요."
                                style={{width : '35rem'}}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Help;
