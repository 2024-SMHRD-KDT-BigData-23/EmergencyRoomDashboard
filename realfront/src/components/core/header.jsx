import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Offcanvas, Container } from 'react-bootstrap';
import menuWhite from '../../assets/images/menuwhite.png'; // 메뉴 아이콘 이미지

const Header = () => {

    const [show, setShow] = useState(false); // offCanvas 상태를 저장
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <Navbar bg="light" expand="lg" className="header-bg">
      <Container fluid>
        {/* 로고 */}
        <Navbar.Brand as={Link} to="/List">
          <img src={menuWhite} className="menuimg" width="40px" height="40px" alt="Menu" />
        </Navbar.Brand>

        {/* 햄버거 메뉴 (반응형) */}
        <Navbar.Toggle aria-controls="offcanvasNavbar" />

        {/* Offcanvas 메뉴 */}
        <Offcanvas placement="start" show={show} id="offcanvasNavbar" onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>메뉴</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={Link} to="/List">Present Patient</Nav.Link>
              <Nav.Link as={Link} to="/AllList">All Patient</Nav.Link>
              <Nav.Link as={Link} to="/Search">Search Patient</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>

        {/* 메인 타이틀 중앙 배치 */}
        <div className="titleSet text-center mx-auto">
          <div className="MainTitle">
            <Link to='/List' className='MainLogoLink'>
              NCDSS
            </Link>
          </div>
          <div className="SubTitle">by NAMNAM</div>
        </div>

        {/* 오른쪽 병원이름 드롭다운 */}
        <Nav className="ms-auto">
          <NavDropdown title="스마트병원" id="basic-nav-dropdown" align="end">
            <NavDropdown.Item href="#">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
