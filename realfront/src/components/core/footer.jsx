import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../assets/scss/footer.scss';

const Footer = () => {
    return (
        <div className="footer footerBg">
            <Container fluid>
                <Row className="py-2">
                    <Col className="d-flex align-items-center justify-content-center">
                        <div className="text-center">
                            <h5>NCDSS</h5>
                            <p>NCDSS는 응급실 환자들의 배치에 <br /> 도움을 주기 위한 도구입니다.</p>
                        </div>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-center">
                        <div className="text-center">
                            <h5>Address</h5>
                            <p>KR, 60 Songam-ro, Nam-gu, Gwangju</p>
                        </div>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-center">
                        <div className="text-center">
                            <h5>Phone</h5>
                            <p>Reception : +82 2841 8972 <br />Office : +82 1522 7800</p>
                        </div>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-center">
                        <div className="text-center">
                            <h5>Email</h5>
                            <p>Office : <a href="mailto:dlwlgnsrhy@gmail.com" className="link">dlwlgnsrhy@gmail.com</a> <br />Site : <a href="mailto:Site@NamNam.com" className="link">Site@NamNam.com</a></p>
                        </div>
                    </Col>
                </Row>
                <Row className="f4-bottom-bar">
                    <Col md="12">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="copyright">All Rights Reserved by NamNam.</div>
                            <div className="footer-links">
                                <a href="#" className="link footerLink">Terms of Use</a>
                                <a href="#" className="link footerLink">Legal Disclaimer</a>
                                <a href="#" className="link footerLink">Privacy Policy</a>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Footer;
