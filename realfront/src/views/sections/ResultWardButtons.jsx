import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

const ResultWardButtons = ({ pageNumbers, prevPage, nextPage, staffId, admissionId, resultWard, setResultWard }) => {

    const [showModal, setShowModal] = useState(false);

    const handleDischargeClick = () => {
        setResultWard('Discharge');
        setShowModal(true);
    };

    const handleWardClick = () => {
        setResultWard('Ward');
        setShowModal(true);
    };

    const handleICUClick = () => {
        setResultWard('ICU');
        setShowModal(true);
    };

    const handleConfirm = () => {
        axios.post(`http://localhost:8080/api/ER/resultWards/${staffId}/${admissionId}`, {
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

    return (
        <>
            {pageNumbers.length >= 1 ? (
                <div className="d-flex justify-content-start">
                    <ul className="pagination m-0">
                        <li className="page-item">
                            <button className="page-link" onClick={prevPage}>이전</button>
                        </li>
                        <li className="page-item">
                            <button className="page-link" onClick={nextPage}>다음</button>
                        </li>
                    </ul>
                </div>
            ) : null}
            <div className="d-flex justify-content-end">
                <Button variant="primary" onClick={handleDischargeClick} className="me-2">
                    Discharge
                </Button>
                <Button variant="success" onClick={handleWardClick} className="me-2">
                    Ward
                </Button>
                <Button variant="danger" onClick={handleICUClick} className="me-2">
                    ICU
                </Button>
            </div>
            < Modal show={showModal} onHide={handleCancel} >
                <Modal.Header closeButton>
                    <Modal.Title>환자 배치 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {`환자를 ${resultWard}로 배치시키겠습니까?`}
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
        </>
    );
}

export default ResultWardButtons;