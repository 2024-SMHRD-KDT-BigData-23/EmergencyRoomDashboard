import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import menuWhite from '../../assets/images/menuwhite.png';
import menu from '../../assets/images/menu.png';
import CommentModal from '../../components/core/commentmodal';

const CurrentPage = () => {

    /* 드롭다운 선택시 선택 표출 함수*/ 
    const [sectionContent, setSectionContent] = useState('Section');
    const [ncdssContent, setNcdssContent] = useState('NCDSS');

    const changeSectionContent = (newContent) => {
        setSectionContent(newContent);
    };

    const changeNcdssContent = (newContent) => {
        setNcdssContent(newContent);
    };

    const [patients, setPatients] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 11; // 한 페이지에 표시할 항목 수

    useEffect(() => {
        axios.get(`http://localhost:8080/api/ER/medical-patients/All/All`)
            .then(response => {
                setPatients(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    // 현재 페이지에 표시할 데이터를 계산합니다.
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = patients.slice(indexOfFirstItem, indexOfLastItem);

    // 페이지를 변경하는 함수입니다.
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // 총 페이지 수를 계산하고 페이지 번호를 배열에 저장합니다.
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(patients.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="ourcontainer">
            {/* header area */}
            <header className="ourheader">
                <div className="headerContainer">
                    {/* 왼쪽 카테고리 사이드바 */}
                    <a className="btn" data-bs-toggle="offcanvas" href="#offcanvasExample" role="img" aria-controls="offcanvasExample">
                        <img src={menuWhite} className="menuimg" width="40px" height="40px" alt="Menu" />
                    </a>

                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div className="offcanvas-header">
                            <img src={menu} width="40px" height="40px" alt="Menu" />
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <div className="list-group list-group-flush" style={{ width: '300px' }}>
                                <a href="/List" className="list-group-item list-group-item-action">Present Patient</a>
                                <a href="/AllList" className="list-group-item list-group-item-action">All Patient</a>
                                <a href="/Search" className="list-group-item list-group-item-action">Search Patient</a>
                            </div>
                        </div>
                    </div>

                    {/* 메인 NCDSS + by NAMNAM */}
                    <div className="titleSet">
                        <div className="MainTitle">
                            <a href='/List' className='MainLogoLink'>
                            NCDSS
                            </a>
                            </div>
                        <div className="SubTitle">by NAMNAM</div>
                    </div>

                    {/* 오른쪽 병원이름 드롭다운 */}
                    <div class="dropdown">
                    <button class="btn hopitalUser" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        스마트병원
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Logout</a></li>
                    </ul>
                    </div>




                </div>
            </header>

            {/* dropdown area */}
            <div className="ourdropdown">
                <div className="ourdropdownSet">
                    <div className="dropdown ourdropdown1">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {sectionContent}
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#" onClick={() => changeSectionContent('All')}>All</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => changeSectionContent('일반구역A')}>일반구역A</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => changeSectionContent('일반구역B')}>일반구역B</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => changeSectionContent('중증구역')}>중증구역</a></li>
                        </ul>
                    </div>

                    <div className="dropdown ourdropdown2">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {ncdssContent}
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#" onClick={() => changeNcdssContent('All')}>All</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => changeNcdssContent('HOME')}>HOME</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => changeNcdssContent('WARD')}>WARD</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => changeNcdssContent('ICU')}>ICU</a></li>
                        </ul>
                    </div>
                </div>

                {/* 검색 탭 */}
                <nav className="navbar navbar-light">
                    <div className="container-fluid">
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-secondary" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
        
            </div>

            {/* main area */}
            <main className="ourcontent">
                <div className="mainContent">
                    <table className="table table-borderless table-striped" style={{ textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th scope="col">In Time</th>
                                <th scope="col">MT(Measurement)</th>
                                <th scope="col">Patient ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Sex</th>
                                <th scope="col">Temp</th>
                                <th scope="col">HR</th>
                                <th scope="col">RR</th>
                                <th scope="col">SPO2</th>
                                <th scope="col">SBP</th>
                                <th scope="col">DBP</th>
                                <th scope="col">Section</th>
                                <th scope="col">NCDSS</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map(patient => (
                                <tr key={patient.id}>
                                        <td>
                                        <Link to={`/Detail/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            2024.05.05 16:48:30
                                        </Link>
                                        </td>
                                        <td>
                                        <Link to={`/Detail/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            2024.05.05 17:18:30
                                        </Link>
                                            </td>
                                        <td>
                                        <Link to={`/Detail/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            {patient.patientId}
                                        </Link>
                                        </td>
                                        <td>
                                        <Link to={`/Detail/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            {patient.patientName}
                                        </Link>
                                            </td>
                                        <td>
                                        <Link to={`/Detail/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            {patient.patientSex}
                                        </Link>
                                            </td>
                                        <td>
                                        <Link to={`/Detail/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            {patient.patientVitalTemperature}°C
                                        </Link>
                                            </td>
                                        <td>
                                        <Link to={`/Detail/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            {patient.patientVitalHr}
                                        </Link>
                                            </td>
                                        <td>
                                        <Link to={`/Detail/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            {patient.patientVitalRespiratoryRate}
                                        </Link>
                                            </td>
                                        <td>
                                        <Link to={`/Detail/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            {patient.patientVitalSpo2}
                                        </Link>
                                            </td>
                                        <td>
                                        <Link to={`/Detail/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            {patient.patientVitalNibpS}
                                        </Link>
                                            </td>
                                        <td>
                                        <Link to={`/Detail/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            {patient.patientVitalNibpD}
                                        </Link>
                                            </td>
                                        <td>
                                        <Link to={`/Detail/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            {patient.bedWard}
                                        </Link>
                                            </td>
                                        <td>
                                        <Link to={`/Detail/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            {patient.deepNcdss}
                                        </Link>
                                            </td>
                                    <td>
                                        <CommentModal />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    <div style={{ textAlign: 'center' }}>
                        <ul className="pagination justify-content-center" >
                            {pageNumbers.map(number => (
                                <li key={number} className="page-item">
                                    <button onClick={() => paginate(number)} className="page-link" >
                                        {number}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div> 
                    </div>
            </main>
        </div>
    );
};


export default CurrentPage;
