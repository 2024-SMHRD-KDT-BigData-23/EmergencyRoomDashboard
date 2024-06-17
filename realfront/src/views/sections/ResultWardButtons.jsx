import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ResultWardButtons = ({ pageNumbers, prevPage, nextPage, staffId, admissionId, resultWard, setResultWard }) => {

    const [showModal, setShowModal] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

    const handleDischargeClick = () => {
        if (staffId.startsWith('D')) {
            setResultWard('Discharge');
            setShowModal(true);
        } else {
            setShowWarning(true);
        }
    };

    const handleWardClick = () => {
        if (staffId.startsWith('D')) {
            setResultWard('Ward');
            setShowModal(true);
        } else {
            setShowWarning(true);
        }
    };

    const handleICUClick = () => {
        if (staffId.startsWith('D')) {
            setResultWard('ICU');
            setShowModal(true);
        } else {
            setShowWarning(true);
        }
    };

    const handleConfirm = () => {
        axios.post(`http://3.144.162.188:8080/api/ER/resultWards/${staffId}/${admissionId}`, {
            resultWard: resultWard
        })
            .then(response => {
                alert("환자 배치 성공")
                setResultWard('');
            })
            .catch(error => {
                alert("환자 배치 실패")
            });

        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    };
    const handleWarningClose = () => {
        setShowWarning(false);
    };

    return (
        <>
            {pageNumbers.length >= 0 ? (
                <div className="d-flex justify-content-start">
                    <ul className="pagination m-0">
                        <li className="page-item">
                            <button className="page-link" onClick={prevPage}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                        </li>
                        <li className="page-item">
                            <button className="page-link" onClick={nextPage}>
                            <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </li>
                    </ul>
                </div>
            ) : null}
            
            <div className="d-flex justify-content-end">
                <Button onClick={handleDischargeClick} className="me-2 detailBtn1">
                    Discharge
                </Button>
                <Button onClick={handleWardClick} className="me-2 detailBtn2">
                    Ward
                </Button>
                <Button onClick={handleICUClick} className="me-2 detailBtn3">
                    ICU
                </Button>
            </div>

            < Modal show={showModal} onHide={handleCancel} >
                <Modal.Header closeButton>
                    <Modal.Title>환자 배치 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {`환자를 정말 ${resultWard}로 배치시키겠습니까?`}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal >

            <Modal show={showWarning} onHide={handleWarningClose}>
                <Modal.Header closeButton>
                    <Modal.Title>권한 없음</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    이 작업을 수행할 권한이 없습니다.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleWarningClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ResultWardButtons;