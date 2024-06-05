import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import '../../assets/scss/commentmodal.scss'

const DiagnosisModal = () => {
    const { id } = useParams();
    const [selectedDisposition, setSelectedDisposition] = useState('Result Ward');
    const [selectedComment, setSelectedComment] = useState("진료 결과를 기록해주세요.");

    const changeComment = (event) => {
        setSelectedComment(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(selectedDisposition);
        console.log(selectedComment);
        axios.patch(`http://localhost:8080/api/ER/set/medical-patients/${id}`, {
            admissionId: id,
            admissionResultWard: selectedDisposition,
            admissionComment: selectedComment
        })
            .then(response => {
                console.log('DB 업데이트 성공:', response.data);
            })
            .catch(error => {
                console.error('DB 업데이트 실패:', error);
            });
    };

    return (
        <div>
            <button type="button" className="btn btn-sm modalBtn" data-bs-toggle="modal" style={{ color: 'white' }} data-bs-target="#exampleModal">Comment</button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New message</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={() => handleSubmit}>
                                <div className="mb-3" style={{ textAlign: 'left' }}>
                                    <label htmlFor="message-text" className="col-form-label">Comment</label>
                                    <textarea className="form-control" id="message-text" onChange={changeComment} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiagnosisModal;