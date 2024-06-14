    import React from 'react';
    import { Link ,useNavigate } from 'react-router-dom';
    import { Navbar, Container, Row, Col, Dropdown } from 'react-bootstrap';
    import '../../assets/scss/header.scss';
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faStar, faStethoscope } from '@fortawesome/free-solid-svg-icons';

    const AdminHeader = () => {

        const navigate =useNavigate();
        const handleLogout = (e) => {
            e.preventDefault();
            // JWT 토큰 제거
            localStorage.removeItem("token");
            navigate("/");
        };

        return (
            <Navbar expand="lg" className="header-bg">
                <Container fluid>
                
                    {/* 로고 */}
                    <Row className="w-100">
                        

    
                    {/* 메인 타이틀 왼쪽 배치 */}
                    <Col className="d-flex justify-content-start align-items-center">
                            <div className="titleSet d-flex">
                                <div className="MainTitle">
                                    <Link to='/admin' className='MainLogoLink'>
                                        NCDSS
                                    </Link>
                                </div>
                                <div className="SubTitle2">
                                by NAMNAM
                                </div>
                            </div>
                    </Col>

                <Col className='d-flex allign-items-center justify-content-center'>
                    <Col className='d-flex align-items-center justify-content-center pageMove'>
                    <Link to='/Admin' className='MainLogoLink'>
                    DashBoard
                    </Link>
                    </Col>
                    <Col className='d-flex align-items-center justify-content-center pageMove'>
                    <Link to='/Role/All/All Roles/All Statuses' className='MainLogoLink'>
                    Role
                    </Link>
                    </Col>
                    <Col className='d-flex align-items-center justify-content-center pageMove'>
                    <Link to='/Data' className='MainLogoLink'>
                    Data
                    </Link>
                    </Col>
                    <Col className='d-flex align-items-center justify-content-center pageMove'>
                    <Link to='/Surveillance' className='MainLogoLink'>
                    Surveillance
                    </Link>
                    </Col>
                    <Col className='d-flex align-items-center justify-content-center pageMove'>
                    <Link to='/Report' className='MainLogoLink'>
                    Report
                    </Link>
                    </Col>
                    <Col className='d-flex align-items-center justify-content-center pageMove'>
                    <Link to='/Help' className='MainLogoLink'>
                    Help
                    </Link>
                    </Col>
                </Col>   

                    {/* 오른쪽 병원이름 드롭다운 */}
                    <Col xs="auto" className="d-flex justify-content-end align-items-center rightMenu ">
                        
                        <div class="dropdown">
                        <button class="btn hospitalUser" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <FontAwesomeIcon icon={faStethoscope} className='ex123123'/> 스마트병원
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                        <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                        </ul>
                        </div>
                    </Col>

                    </Row>

                </Container>
            </Navbar>
        );
    };

    export default AdminHeader;
