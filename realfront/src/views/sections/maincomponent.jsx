    import React, { useEffect, useState } from 'react';
    import { Link } from 'react-router-dom';
    import axios from 'axios';
    import menuWhite from '../../assets/images/menuwhite.png';
    import menu from '../../assets/images/menu.png';

    const CurrentPage = () => {

        /* 드롭다운 선택시 선택 표출 함수*/
        const [sectionContent, setSectionContent] = useState('Section');
        const [ncdssContent, setNcdssContent] = useState('NCDSS');


        const [section, setSection] = useState('All');
        const [ncdss, setNcdss] = useState('All');

        const changeSectionContent = (event) => {
            setSectionContent(event.target.innerText);
            setSection(event.target.innerText);
        };

        const changeNcdssContent = (event) => {
            setNcdssContent(event.target.innerText);
            setNcdss(event.target.innerText);
        };


        // 폼 제출 시 페이지 리로드 방지
        const handleSubmit = async (event) => {
            event.preventDefault();
        }

        const requestData = {
            bedWard :section,
            deepNcdss:ncdss,
        }

        const [patients, setPatients] = useState([]);
        const [currentPage, setCurrentPage] = useState(1);
        const itemsPerPage = 11; // 한 페이지에 표시할 항목 수

        useEffect(() => {
            axios.post(`http://localhost:8080/api/ER/medical-patients`, requestData)
                .then(response => {
                    setPatients(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data: ', error);
                });
        }, [section, ncdss]);

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
                    <form onSubmit={handleSubmit}>
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
                    </form>
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
                                {/* pid검색했을떄 swagger의 json형식의 값이 나오고 그 값중에 골라서 화면에 표현해줄거야!
                                patients.patientId-> "PID-3969-7923 를 input에 담았을때 일이 일어야돼! 

                                어떤일이? -> 
                                */}
                                
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
                                                                            Result Ward
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
