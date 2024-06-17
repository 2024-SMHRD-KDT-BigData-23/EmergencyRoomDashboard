import React, { useState } from 'react';
import axios from 'axios';
import { Dropdown, DropdownButton, Modal, Button } from "react-bootstrap";
import '../../assets/scss/commentmodal.scss';

const ActionModal = ({ admissionId, setAction }) => {
    const staffId = sessionStorage.getItem("staffId");
    const [selectedResultWard, setSelectedResultWard] = useState(null);
    const [selectedComment, setSelectedComment] = useState(null);
    const [showWarning, setShowWarning] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);

    const changeComment = (event) => {
        setSelectedComment(event.target.value);
    }

    const changeResultWard = (eventKey) => {
        setSelectedResultWard(eventKey);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const resultWardPromise = axios.post(`http://3.144.162.188:8080/api/ER/resultWards/${staffId}/${admissionId}`, {
            resultWard: selectedResultWard
        });

        const commentPromise = axios.post(`http://3.144.162.188:8080/api/ER/comments/${staffId}/${admissionId}`, {
            comment: selectedComment
        });

        Promise.all([resultWardPromise, commentPromise])
            .then(([resultWardResponse, commentResponse]) => {
                setAction(true);
                alert("환자 배치 결정 성공!");
            })
            .catch(error => {
                console.error("Action fail.. ", error);
                alert("통신 오류..");
            });

        setSelectedResultWard(null);
        setSelectedComment(null);
        setAction(false);
        setShowActionModal(false); // Close the action modal after submission
    };

    const handleWarningClose = () => {
        setShowWarning(false);
    };

    const handleActionClick = (event) => {
        if (!staffId.startsWith('D')) {
            event.preventDefault();
            setShowWarning(true);
        } else {
            setShowActionModal(true);
        }
    };

    const handleActionModalClose = () => {
        setShowActionModal(false);
    };

    return (
        <div onClick={(event) => { event.stopPropagation() }}>
            <button 
                type="button" 
                className="btn btn-sm btn-warning modalBtn" 
                style={{ color: 'white' }} 
                onClick={handleActionClick}
            >
                Action
            </button>
            <Modal show={showActionModal} onHide={handleActionModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Decision</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3" style={{ textAlign: 'left' }}>
                            <label htmlFor="message-text" className="col-form-label">Disposition</label>                                                                        
                            <DropdownButton
                                title={selectedResultWard !== null ? selectedResultWard : "Action"}
                                variant="warning"
                                size="sm"
                                onSelect={changeResultWard}
                            >
                                <Dropdown.Item eventKey="Discharge">Discharge</Dropdown.Item>
                                <Dropdown.Item eventKey="Ward">Ward</Dropdown.Item>
                                <Dropdown.Item eventKey="ICU">ICU</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <div className="mb-3" style={{ textAlign: 'left' }}>
                            <label htmlFor="message-text" className="col-form-label">Comment</label>
                            <textarea className="form-control" id="message-text" onChange={changeComment} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleActionModalClose}>
                        Close
                    </Button>
                    <Button type="submit" onClick={handleSubmit} variant="primary">
                        Apply
                    </Button>
                </Modal.Footer>
            </Modal>

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
        </div>
    );
};

export default ActionModal;
