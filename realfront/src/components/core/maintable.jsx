import React from 'react';
import { Row, Col } from 'react-bootstrap';
import '../../assets/scss/maintable.scss';
import { useNavigate } from 'react-router-dom';
import ActionModal from './ActionModal';
import CopyButton from '../../views/sections/CopyButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAnglesLeft, faAngleRight, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import usePagination from '../../hooks/usePagination';

const MainTable = ({ patients, setAction }) => {

    const navigate = useNavigate();
    const { currentItems, pageNumbers, paginate, currentPage, prevPage, nextPage, goToFirstPage, goToLastPage } = usePagination(patients, 14);
    const formatDate = (dateObj) => {
        return `${String(dateObj.year).padStart(2, '0')}.${String(dateObj.month).padStart(2, '0')}.${String(dateObj.day).padStart(2, '0')} ${String(dateObj.hour).padStart(2, '0')}:${String(dateObj.minute).padStart(2, '0')}:${String(dateObj.second).padStart(2, '0')}`;
    };

    const renderDeepNcdssLink = (patient) => {
        let color = 'inherit';
        if (patient.deepNcdss === 'Discharge') {
            color = 'rgb(130, 130, 236)';
        } else if (patient.deepNcdss === 'Ward') {
            color = 'rgb(100, 200, 100)';
        } else if (patient.deepNcdss === 'ICU') {
            color = 'rgb(221, 102, 102)';
        }

        return (
            <td onClick={() => navigate(`/Detail/${patient.patientId}/${patient.admissionId}`)}>
                <span style={{ color }}>
                    {patient.deepNcdss}
                </span>
            </td>
        );
    };

    const renderPatientId = (patient) => {
        return (
            <td onClick={() => navigate(`/Detail/${patient.patientId}/${patient.admissionId}`)}>
                <Row className="justify-content-center align-items-center">
                    <Col md={7} className="p-0">
                        <span className="">{patient.patientId}</span>
                    </Col>
                    <Col md={1} className="p-0">
                        <CopyButton text={patient.patientId} />
                    </Col>
                </Row>
            </td>
        );
    };

    const renderPatientName = (patient) => {
        return (
            <td onClick={() => navigate(`/Detail/${patient.patientId}/${patient.admissionId}`)}>
                <Row className="justify-content-center align-items-center">
                    <Col md={6} className="p-0">
                        <span>{patient.patientName}</span>
                    </Col>
                    <Col md={1} className="p-0">
                        <CopyButton text={patient.patientName} />
                    </Col>
                </Row>
            </td>
        );
    };

    const renderLink = (patient, field, label, suffix = '') => {
        if (field === 'deepNcdss') {
            return renderDeepNcdssLink(patient);
        } else if (field === 'patientId') {
            return renderPatientId(patient);
        } else if (field === 'patientName') {
            return renderPatientName(patient);
        } else if (field === 'resultWard') {
        } else {
            return (
                <td onClick={() => navigate(`/Detail/${patient.patientId}/${patient.admissionId}`)}>
                    <span>{label}{suffix}</span>
                </td>
            );
        }
    };

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
                                <tr key={patient.id} className='align-middle' style={{ height: '3rem', cursor: 'pointer' }}>
                                    {renderLink(patient, 'admissionInTime', formatDate(patient.admissionInTime))}
                                    {renderLink(patient, 'patientVitalCreatedAt', formatDate(patient.patientVitalCreatedAt))}
                                    {renderLink(patient, 'patientId', patient.patientId)}
                                    {renderLink(patient, 'patientName', patient.patientName)}
                                    {renderLink(patient, 'patientSex', patient.patientSex)}
                                    {renderLink(patient, 'patientVitalTemperature', patient.patientVitalTemperature, '°C')}
                                    {renderLink(patient, 'patientVitalHr', patient.patientVitalHr)}
                                    {renderLink(patient, 'patientVitalRespiratoryRate', patient.patientVitalRespiratoryRate)}
                                    {renderLink(patient, 'patientVitalSpo2', patient.patientVitalSpo2)}
                                    {renderLink(patient, 'patientVitalNibpS', patient.patientVitalNibpS)}
                                    {renderLink(patient, 'patientVitalNibpD', patient.patientVitalNibpD)}
                                    {renderLink(patient, 'bedWard', patient.bedWard)}
                                    {renderLink(patient, 'deepNcdss', patient.deepNcdss)}
                                    {patient && patient.resultWard ? (
                                        renderLink(patient, 'resultWard', patient.resultWard)
                                    ) : (
                                        <td onClick={() => navigate(`/Detail/${patient.patientId}/${patient.admissionId}`)}>
                                            <ActionModal admissionId={patient.admissionId} setAction={setAction} />
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center align-items-center pagination" style={{ position: 'fixed', bottom: '0', left: '0', right: '0', textAlign: 'center' }}>
                        <button onClick={goToFirstPage} className="page-link">
                            <FontAwesomeIcon icon={faAnglesLeft} />
                        </button>
                        <button onClick={prevPage} className="page-link">
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                        {pageNumbers.map((number, index) => (
                            <button
                                key={index}
                                onClick={() => (typeof number === 'number' ? paginate(number) : null)}
                                className={`page-link ${currentPage === number ? 'active' : ''}`}
                                disabled={typeof number !== 'number'}
                            >
                                {number}
                            </button>
                        ))}
                        <button onClick={nextPage} className="page-link">
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                        <button onClick={goToLastPage} className="page-link">
                            <FontAwesomeIcon icon={faAnglesRight} />
                        </button>
                    </div>
                </div>
            </main >
        </div >
    );
};

export default MainTable;
