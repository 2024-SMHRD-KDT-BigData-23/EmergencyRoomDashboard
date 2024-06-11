import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Col } from "react-bootstrap";
import "../../assets/scss/header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStethoscope, faTable } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Header = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const staffId = sessionStorage.getItem("staffId");

      await axios.post('http://localhost:8080/api/logout', {}, {

        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          staffId: staffId
        },
        withCredentials: true
      });

      // 로그아웃이 성공하면 로컬 스토리지와 세션 스토리지에서 데이터를 삭제합니다.
      localStorage.removeItem("token");
      sessionStorage.removeItem("staffId");

      // 로그인 페이지로 리디렉션합니다.
      navigate('/');
    } catch (error) {
      console.error('Error logging out', error);
    }
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
