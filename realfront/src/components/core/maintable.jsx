import React, {  useState } from 'react';
import '../../assets/scss/maintable.scss';
import { Link } from 'react-router-dom';
import CommentModal from './commentmodal';

const MainTable = ({ patients }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 14; // 한 페이지에 표시할 항목 수

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
                    <table className="table table-borderless " style={{ textAlign: 'center'   }}>
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
                                <tr key={patient.id} className='MainTableFont '>
                                        <td>
                                        <Link to={`/Detail/${patient.patientId}/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            {`${String(patient.admissionInTime.year).padStart(2, '0')}.${String(patient.admissionInTime.month).padStart(2, '0')}.${String(patient.admissionInTime.day).padStart(2, '0')}
                                            ${String(patient.admissionInTime.hour).padStart(2, '0')}:${String(patient.admissionInTime.minute).padStart(2, '0')}:${String(patient.admissionInTime.second).padStart(2, '0')}`}
                                            
                                        </Link>
                                        </td>
                                        <td>
                                        <Link to={`/Detail/${patient.patientId}/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            {`${patient.patientVitalCreatedAt.year}.${String(patient.patientVitalCreatedAt.month).padStart(2, '0')}.${String(patient.patientVitalCreatedAt.day).padStart(2, '0')}
                                            ${String(patient.patientVitalCreatedAt.hour).padStart(2, '0')}:${String(patient.patientVitalCreatedAt.minute).padStart(2, '0')}:${String(patient.patientVitalCreatedAt.second).padStart(2, '0')}
                                            `}
                                        </Link>
                                        </td>
                                        <td>
                                        <Link to={`/Detail/${patient.patientId}/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            {patient.patientId}
                                        </Link>
                                        </td>
                                        <td>
                                        <Link to={`/Detail/${patient.patientId}/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            {patient.patientName}
                                        </Link>
                                            </td>
                                        <td>
                                        <Link to={`/Detail/${patient.patientId}/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            {patient.patientSex}
                                        </Link>
                                            </td>
                                        <td>
                                        <Link to={`/Detail/${patient.patientId}/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            {patient.patientVitalTemperature}°C
                                        </Link>
                                            </td>
                                        <td>
                                        <Link to={`/Detail/${patient.patientId}/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            {patient.patientVitalHr}
                                        </Link>
                                            </td>
                                        <td>
                                        <Link to={`/Detail/${patient.patientId}/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            {patient.patientVitalRespiratoryRate}
                                        </Link>
                                            </td>
                                        <td>
                                        <Link to={`/Detail/${patient.patientId}/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            {patient.patientVitalSpo2}
                                        </Link>
                                            </td>
                                        <td>
                                        <Link to={`/Detail/${patient.patientId}/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            {patient.patientVitalNibpS}
                                        </Link>
                                            </td>
                                        <td>
                                        <Link to={`/Detail/${patient.patientId}/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            {patient.patientVitalNibpD}
                                        </Link>
                                            </td>
                                        <td>
                                        <Link to={`/Detail/${patient.patientId}/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            {patient.bedWard}
                                        </Link>
                                            </td>
                                        <td>
                                        <Link to={`/Detail/${patient.patientId}/${patient.admissionId}`} state={{ patient }} className='tableLink'>
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

export default MainTable;