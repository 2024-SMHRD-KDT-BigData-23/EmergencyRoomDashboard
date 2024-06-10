import React, { useState } from 'react';
import axios from 'axios';
import { Dropdown, DropdownButton } from "react-bootstrap";
import '../../assets/scss/commentmodal.scss';

const ActionModal = ({ admissionId }) => {

    const staffId = sessionStorage.getItem("staffId");
    const [selectedResultWard, setSelectedResultWard] = useState(null);
    const [selectedComment, setSelectedComment] = useState(null);

    const changeComment = (event) => {
        setSelectedComment(event.target.value);
    }

    const changeResultWard = (eventKey) => {
        setSelectedResultWard(eventKey);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:8080/api/ER/resultWards/${staffId}/${admissionId}`, {
            resultWard: selectedResultWard
        })
            .then(response => {
                console.log('result_ward 업데이트 성공:', response.data);
            })
            .catch(error => {
                console.log('result_ward 업데이트 실패:', error);
            });

        axios.post(`http://localhost:8080/api/ER/comments/${staffId}/${admissionId}`, {
            comment: selectedComment
        })
            .then(response => {
                console.log('comment 업데이트 완료', response.data);
            })
            .catch(error => {
                console.log("comment 업데이트 실패 : ", error);
            })
    };

    return (
        <div>
            <button type="button" className="btn btn-sm btn-warning modalBtn" data-bs-toggle="modal" style={{ color: 'white' }} data-bs-target="#exampleModal">Action</button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Decision</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <DropdownButton
                                    title="Action"
                                    variant="warning"
                                    size="sm"
                                    onSelect={changeResultWard}
                                >
                                    <Dropdown.Item eventKey="DISCHARGE">DISCHARGE</Dropdown.Item>
                                    <Dropdown.Item eventKey="WARD">WARD</Dropdown.Item>
                                    <Dropdown.Item eventKey="ICU">ICU</Dropdown.Item>
                                </DropdownButton>
                                <div className="mb-3" style={{ textAlign: 'left' }}>
                                    <label htmlFor="message-text" className="col-form-label">Comment</label>
                                    <textarea className="form-control" id="message-text" onChange={changeComment} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" onClick={handleSubmit} className="btn btn-primary">Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActionModal;