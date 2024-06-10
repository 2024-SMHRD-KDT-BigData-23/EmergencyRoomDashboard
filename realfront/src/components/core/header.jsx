import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Col } from "react-bootstrap";
import "../../assets/scss/header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStethoscope, faTable } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Header = () => {

  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios.post('http://localhost:8080/api/logout', {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      if (response.status === 200) {
        // JWT 토큰 제거
        localStorage.removeItem("token");
        navigate("/");
      }
    }).catch(error => {
      console.error("There was an error logging out!", error);
    });
  };

  return (
    <Navbar bg="" expand="lg" className="header-bg">
      <Container fluid>
        {/* 메인 타이틀 중앙 배치 */}
        <Col className="d-flex justify-content-start align-items-center">
          <div className="titleSet d-flex">
            <div className="MainTitle">
              <Link to="/present/List/All" className="MainLogoLink">
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
            <Link to="/present/List/All" className="MainLogoLink">
              Present
            </Link>
          </div>

          <div className="pageMove">
            <FontAwesomeIcon icon={faTable} className="fIcon" />
            <Link to="/past/List/All" className="MainLogoLink">
              Past
            </Link>
          </div>

          <div className="dropdown">
            <button
              className="btn hospitalUser"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faStethoscope} /> 스마트병원
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        </Col>
      </Container>
    </Navbar>
  );
};

export default Header;
