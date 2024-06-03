import React from 'react';
import menuWhite from '../../assets/images/menuwhite.png';
import menu from '../../assets/images/menu.png';

const AllListComponent = () => {
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
                            <div className="list-group list-group-flush" style={{ width: "300px" }}>
                                <a href="#" className="list-group-item list-group-item-action">Present Patient</a>
                                <a href="#" className="list-group-item list-group-item-action">All Patient</a>
                                <a href="#" className="list-group-item list-group-item-action">Search Patient</a>
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
                                <th scope="col">In time</th>
                                <th scope="col">Inspection time</th>
                                <th scope="col">P-ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Sex</th>
                                <th scope="col">Acuity</th>
                                <th scope="col">Temperature</th>
                                <th scope="col">HR</th>
                                <th scope="col">RR</th>
                                <th scope="col">SPO2</th>
                                <th scope="col">nibp_s</th>
                                <th scope="col">nibp_d</th>
                                <th scope="col">OutTime</th>
                                <th scope="col">NCDSS</th>
                                <th scope="col">Disposition</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2024.05.22 13:06:12</td>
                                <td>2024.05.25 17:06:12</td>
                                <td>홍길동</td>
                                <td>홍길동</td>
                                <td>M</td>
                                <td>12</td>
                                <td>87</td>
                                <td>33</td>
                                <td>22</td>
                                <td>15</td>
                                <td>15</td>
                                <td>45</td>
                                <td>OutTime</td>
                                <td>ICU</td>
                                <td>ICU</td>
                            </tr>
                            <tr>
                                <td>2024.05.22 13:06:12</td>
                                <td>2024.05.25 17:06:12</td>
                                <td>홍길동</td>
                                <td>홍길동</td>
                                <td>F</td>
                                <td>12</td>
                                <td>87</td>
                                <td>33</td>
                                <td>22</td>
                                <td>15</td>
                                <td>15</td>
                                <td>45</td>
                                <td>OutTime</td>
                                <td>ICU</td>
                                <td>WARD</td>
                            </tr>
                            {/* 나머지 테이블 행들도 동일한 방식으로 추가 */}
                        </tbody>
                    </table>
                    <div style={{ textAlign: 'center' }}>
                        <button>&lt;&lt;</button>
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>4</button>
                        <button>5</button>
                        <button>&gt;&gt;</button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AllListComponent;
