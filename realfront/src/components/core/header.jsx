import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Offcanvas, Container, Row, Col } from "react-bootstrap";
import "../../assets/scss/header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStethoscope, faTable } from "@fortawesome/free-solid-svg-icons";
import SearchForm from "./searchForm";

const Header = () => {
  const [show, setShow] = useState(false); // offCanvas 상태를 저장
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = (e) => {
    e.preventDefault();
    // JWT 토큰 제거
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Navbar bg="" expand="lg" className="header-bg">
      <Container fluid>
        {/* 메인 타이틀 중앙 배치 */}
        <Col className="d-flex justify-content-start align-items-center">
          <div className="titleSet d-flex">
            <div className="MainTitle">
              <Link to="/List" className="MainLogoLink">
                NCDSS
              </Link>
            </div>
            <div className="SubTitle2">by NAMNAM</div>
          </div>
        </Col>

        {/* 오른쪽 병원이름 드롭다운 */}
        <Col
          xs="auto"
          className="d-flex justify-content-end align-items-center rightMenu "
        >
          <div className="pageMove">
            <FontAwesomeIcon icon={faTable} className="fIcon" />
            <Link to="/List" className="MainLogoLink">
              Present
            </Link>
          </div>

          <div className="pageMove">
            <FontAwesomeIcon icon={faTable} className="fIcon" />
            <Link to="/Alllist" className="MainLogoLink">
              Past
            </Link>
          </div>

          <div class="dropdown">
            <button
              class="btn hospitalUser"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faStethoscope} /> 스마트병원
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        </Col>
      </Container>
    </Navbar>
  );
};

export default Header;
