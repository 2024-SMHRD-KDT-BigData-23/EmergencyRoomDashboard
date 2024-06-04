import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
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

                    <Link to='/Admin' className='MainLogoLink'>
                       DashBoardPage
                                </Link>
                    </Col>
                    <Col className='d-flex align-items-center AdminPage'>
                    <Link to='/Role' className='MainLogoLink'>
                    RolePage
                                </Link>
                    </Col>
                    <Col className='d-flex align-items-center AdminPage'>
                    <Link to='/Data' className='MainLogoLink'>
                    DataPage
                                </Link>
                    </Col>
                    <Col className='d-flex align-items-center AdminPage'>
                    <Link to='/Surveillance' className='MainLogoLink'>
                    SurveillancePage
                                </Link>
                    </Col>
                    <Col className='d-flex align-items-center AdminPage'>
                    <Link to='/Report' className='MainLogoLink'>
                    ReportPage
                                </Link>
                    </Col>
                    <Col className='d-flex align-items-center AdminPage'>
                    <Link to='/Help' className='MainLogoLink'>
                    HelpPage

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
