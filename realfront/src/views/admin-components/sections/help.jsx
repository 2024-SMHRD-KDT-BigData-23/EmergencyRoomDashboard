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
        axios.post('http://localhost:8080/api/admin/sendEmail',ticket)
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
            {/* 상단 섹션 */}
            <Row>
                <Col>
                    <h1>지원 및 도움말</h1>
                    <Form>
                        <Form.Group controlId="searchHelp">
                            <Form.Control type="text" placeholder="도움말 기사 또는 FAQ 검색..." />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>

            {/* 중간 섹션 */}
            <Row className="my-3">
                <Col>
                    <h2>도움말 주제</h2>
                    <Row>
                        <Col>
                            <Button variant="outline-primary" className="w-100 mb-2">사용자 관리</Button>
                        </Col>
                        <Col>
                            <Button variant="outline-primary" className="w-100 mb-2">시스템 설정</Button>
                        </Col>
                        <Col>
                            <Button variant="outline-primary" className="w-100 mb-2">데이터 관리</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* 하단 섹션 */}
            <Row className="my-3">
                <Col>
                    <h2>지원 티켓 제출</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="issueType" className="mb-3">
                            <Form.Label>문제 유형</Form.Label>
                            <Form.Control
                                as="select"
                                name="issueType"
                                value={ticket.issueType}
                                onChange={handleInputChange}
                            >
                                <option>선택...</option>
                                <option>계정 문제</option>
                                <option>시스템 오류</option>
                                <option>데이터 관련</option>
                                <option>기타</option>
                            </Form.Control>
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
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">티켓 제출</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Help;
