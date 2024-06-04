import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Offcanvas, Container, Row, Col } from 'react-bootstrap';
import '../../assets/scss/header.scss';

const AdminHeader = () => {

    

    return (
        <Navbar bg="secondary" expand="lg" className="header-bg">
            <Container fluid>
              
                {/* 로고 */}
                <Row className="w-100">
                    


                {/* 메인 타이틀 중앙 배치 */}
                    <Col className="d-flex align-items-center">
                        <div className="titleSet d-flex">
                            <div className="MainTitle">
                                <Link to='/List' className='MainLogoLink'>
                                    NCDSS
                                </Link>
                            </div>
                        </div>
                    </Col>

                    <Col className='d-flex align-items-center AdminPage'>
                    <Link to='/List' className='MainLogoLink'>
                        PAGE1
                                </Link>
                    </Col>
                    <Col className='d-flex align-items-center AdminPage'>
                    <Link to='/List' className='MainLogoLink'>
                        PAGE
                                </Link>
                    </Col>
                    <Col className='d-flex align-items-center AdminPage'>
                    <Link to='/List' className='MainLogoLink'>
                        PAGE3
                                </Link>
                    </Col>
                    <Col className='d-flex align-items-center AdminPage'>
                    <Link to='/List' className='MainLogoLink'>
                        PAGE4
                                </Link>
                    </Col>

                {/* 오른쪽 병원이름 드롭다운 */}
                    <Col xs="auto" className="d-flex justify-content-end align-items-center">
                    <div class="dropdown">
                    <button class="btn hopitalUser" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        IDNICKNAME
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="#">Logout</a></li>
                    </ul>
                    </div>
                    </Col>


                </Row>

            </Container>
        </Navbar>
    );
};

export default AdminHeader;
