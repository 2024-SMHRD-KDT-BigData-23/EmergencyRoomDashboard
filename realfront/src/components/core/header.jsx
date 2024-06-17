import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Container, Col } from "react-bootstrap";
import "../../assets/scss/header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNotesMedical, faStethoscope, faTable } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import mainH from '../../assets/images/mainHeader.png';

const Header = () => {

  const navigate = useNavigate();
  const staffId = sessionStorage.getItem("staffId"); // 브라우저 세션 사용자 아이디 불러오기

  /* 동완 추가 함수 */
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

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


  /* 동완 추가 함수 */
  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <Navbar bg="" expand="lg" className="header-bg">
      <Container fluid>
        {/* 메인 타이틀 왼쪽 배치 */}
        <Col className="d-flex justify-content-start align-items-center">
          <div className="titleSet d-flex">
            <div className="MainTitle">
              <Link to="/present/List/All" 
              className="MainLogoTitleLink"
              onClick={() => handleLinkClick("/present/List/All")}
              >
                <img src={mainH} className="HeaderLogo"></img>
                NTAS
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
          <div className={`pageMove ${activeLink === "/present/List/All" ? "active" : ""}`}>
            <Link 
            to="/present/List/All" 
            className="MainLogoLink"
            onClick={() => handleLinkClick("/present/List/All")}
            >
            <FontAwesomeIcon icon={faTable} className="fIcon" />
              In-ER Patients
            </Link>
          </div>

          <div className={`pageMove ${activeLink === "/past/List/All" ? "active" : ""}`}>
            <Link 
            to="/past/List/All" 
            className="MainLogoLink"
            onClick={() => handleLinkClick("/past/List/All")}
            >
            <FontAwesomeIcon icon={faTable} className="fIcon" />
              Ex-ER Patients
            </Link>
          </div>

          <div className="dropdown">
            <button
              className="btn hospitalUser"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {staffId.startsWith('D') ? (
              <FontAwesomeIcon icon={faStethoscope} style={{ marginRight: '0.5rem' }}/> 
              ) : staffId.startsWith('N') ? (
                <FontAwesomeIcon icon={faNotesMedical} style={{ marginRight: '0.5rem' }}/>
              ) : null}
              {staffId}
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
