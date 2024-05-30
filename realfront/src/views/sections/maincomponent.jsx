import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../assets/scss/currentpage.scss'; 
import menuWhite from '../../assets/images/menuwhite.png';
import menu from '../../assets/images/menu.png';

const CurrentPage = () => {
    const [patients, setPatients] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 14; // 한 페이지에 표시할 항목 수

    useEffect(() => {
        axios.get('http://localhost:8080/api/ER/medical-patients')
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
                        <div className="MainTitle">NCDSS</div>
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
                            Acuity
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>

                    <div className="dropdown ourdropdown2">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            NCDSS
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
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
                                <th scope="col">Out Time</th>
                                <th scope="col">Patient ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Sex</th>
                                <th scope="col">Temperature</th>
                                <th scope="col">HR</th>
                                <th scope="col">RR</th>
                                <th scope="col">SPO2</th>
                                <th scope="col">Systolic BP</th>
                                <th scope="col">Diastolic BP</th>
                                <th scope="col">Acuity</th>
                                <th scope="col">NCDSS</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map(patient => (
                                <tr key={patient.id}>
                                    <td>{patient.admissionInTime}</td>
                                    <td>{patient.admissionOutTime}</td>
                                    <td>{patient.patientId}</td>
                                    <td>{patient.patientName}</td>
                                    <td>{patient.patientSex}</td>
                                    <td>{patient.patientVitalTemperature}</td>
                                    <td>{patient.patientVitalHr}</td>
                                    <td>{patient.patientVitalRespiratoryRate}</td>
                                    <td>{patient.patientVitalSpo2}</td>
                                    <td>{patient.patientVitalNibpS}</td>
                                    <td>{patient.patientVitalNibpD}</td>
                                    <td>{patient.patientVitalAcuity}</td>
                                    <td>{patient.deepNcdss}</td>
                                    <td>
                                        <Link to={`/Detail/${patient.admissionId}`} state={{ patient }}>
                                            상세보기
                                        </Link>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-info" data-bs-toggle="modal" style={{ color: 'white' }} data-bs-target="#exampleModal">Comment</button>
                                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">New message</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <form>
                                                            <div className="mb-3" style={{ textAlign: 'left' }}>
                                                                <label htmlFor="recipient-name" className="col-form-label">Recipient:</label>
                                                                <div className="dropdown">
                                                                    <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                                        Dropdown button
                                                                    </button>
                                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                        <li><a className="dropdown-item" href="#">Home</a></li>
                                                                        <li><a className="dropdown-item" href="#">Ward</a></li>
                                                                        <li><a className="dropdown-item" href="#">ICU</a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="mb-3" style={{ textAlign: 'left' }}>
                                                                <label htmlFor="message-text" className="col-form-label">Message:</label>
                                                                <textarea className="form-control" id="message-text"></textarea>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" className="btn btn-primary">Apply</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    <div style={{ textAlign: 'center' }}>
                        <ul className="pagination">
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
