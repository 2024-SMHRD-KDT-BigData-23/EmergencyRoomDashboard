import React, { useState } from 'react';
import '../../assets/scss/maintable.scss';
import { Link } from 'react-router-dom';
import ActionModal from './ActionModal';

const MainTable = ({ patients }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 14; // 한 페이지에 표시할 항목 수
    const totalPages = Math.ceil(patients.length / itemsPerPage);

    // 현재 페이지에 표시할 데이터를 계산합니다.
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = patients.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const getPagination = () => {
        const pageNumbers = [];
        let startPage, endPage;

        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const formatDate = (dateObj) => {
        return `${String(dateObj.year).padStart(2, '0')}.${String(dateObj.month).padStart(2, '0')}.${String(dateObj.day).padStart(2, '0')} ${String(dateObj.hour).padStart(2, '0')}:${String(dateObj.minute).padStart(2, '0')}:${String(dateObj.second).padStart(2, '0')}`;
    };

    const renderLink = (patient, field, label, suffix = '') => (
        <Link to={`/Detail/${patient.patientId}/${patient.admissionId}`} state={{ patient }} className='tableLink'>
            {label}{suffix}
        </Link>
    );

    return (
        <div>
            <main className="ourcontent">
                <div className="mainContent">
                    <table className="table table-hover" style={{ textAlign: 'center' }}>
                        <thead>
                            <tr>
                                {[
                                    "In Time", "MT(Measurement)", "Patient ID", "Name", "Sex", "Temp",
                                    "HR", "RR", "SPO2", "SBP", "DBP", "Section", "NCDSS", "Decision"
                                ].map((header, index) => (
                                    <th key={index} scope="col">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map(patient => (
                                <tr key={patient.id} className='MainTableFont '>
                                    <td>{renderLink(patient, 'admissionInTime', formatDate(patient.admissionInTime))}</td>
                                    <td>{renderLink(patient, 'patientVitalCreatedAt', formatDate(patient.patientVitalCreatedAt))}</td>
                                    <td>{renderLink(patient, 'patientId', patient.patientId)}</td>
                                    <td>{renderLink(patient, 'patientName', patient.patientName)}</td>
                                    <td>{renderLink(patient, 'patientSex', patient.patientSex)}</td>
                                    <td>{renderLink(patient, 'patientVitalTemperature', patient.patientVitalTemperature, '°C')}</td>
                                    <td>{renderLink(patient, 'patientVitalHr', patient.patientVitalHr)}</td>
                                    <td>{renderLink(patient, 'patientVitalRespiratoryRate', patient.patientVitalRespiratoryRate)}</td>
                                    <td>{renderLink(patient, 'patientVitalSpo2', patient.patientVitalSpo2)}</td>
                                    <td>{renderLink(patient, 'patientVitalNibpS', patient.patientVitalNibpS)}</td>
                                    <td>{renderLink(patient, 'patientVitalNibpD', patient.patientVitalNibpD)}</td>
                                    <td>{renderLink(patient, 'bedWard', patient.bedWard)}</td>
                                    <td>
                                        <Link to={`/Detail/${patient.patientId}/${patient.admissionId}`} state={{ patient }} className='tableLink'>
                                            <span style={{ color: patient.deepNcdss === 'Discharge' ? 'rgb(130, 130, 236)' : patient.deepNcdss === 'WARD' ? 'rgb(100, 200, 100)' : patient.deepNcdss === 'ICU' ? 'rgb(221, 102, 102)' : 'inherit' }}>
                                                {patient.deepNcdss}
                                            </span>
                                        </Link>
                                    </td>
                                    <td>
                                        <ActionModal selectedAdmissionId={patient.admissionId} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={{ textAlign: 'center' }}>
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                                <button onClick={() => setCurrentPage(1)} className="page-link">{"<<"}</button>
                            </li>
                            <li className="page-item">
                                <button onClick={handlePrev} className="page-link">{"<"}</button>
                            </li>
                            {getPagination().map(number => (
                                <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                    <button onClick={() => paginate(number)} className="page-link">{number}</button>
                                </li>
                            ))}
                            {totalPages > 10 && currentPage + 4 < totalPages && (
                                <li className="page-item disabled">
                                    <button className="page-link">...</button>
                                </li>
                            )}
                            <li className="page-item">
                                <button onClick={handleNext} className="page-link">{">"}</button>
                            </li>
                            <li className="page-item">
                                <button onClick={() => setCurrentPage(totalPages)} className="page-link">{">>"}</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MainTable;
