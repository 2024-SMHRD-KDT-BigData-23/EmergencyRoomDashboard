import React, { useEffect, useState } from 'react';
import '../../assets/scss/maintable.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MainTable = () => {

    const [patients, setPatients] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 14; // 한 페이지에 표시할 항목 수

    useEffect(() => {
        axios.get('http://localhost:8080/api/ER/medical-patients/All/All')
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
        <div>


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
                                <tr key={patient.id} className='MainTableFont'>
                                        <td>
                                        <Link to={`/Detail/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            {patient.admissionInTime}
                                        </Link>
                                        </td>
                                        <td>
                                        <Link to={`/Detail/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            {patient.patientVitalCreatedAt}
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
                                        <button type="button" className="btn btn-info btn-sm" data-bs-toggle="modal" style={{ color: 'white' }} data-bs-target="#exampleModal">Comment</button>
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

export default MainTable;