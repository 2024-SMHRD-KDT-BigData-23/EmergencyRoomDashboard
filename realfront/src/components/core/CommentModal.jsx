import React, { useState } from 'react';
import axios from 'axios';
import '../../assets/scss/commentmodal.scss'
const CommentModal = ({ staffId, admissionId, setComment }) => {

    const [admissionComment, setAdmissionComment] = useState(null);
    
    const changeComment = (event) => {
        setAdmissionComment(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:8080/api/ER/comments/${staffId}/${admissionId}`, {
            comment: admissionComment
        })
            .then(response => {
                console.log('DB 업데이트 성공:', response.data);
                setComment(response.data.comment);
            })
            .catch(error => {
                console.error('DB 업데이트 실패:', error);
            });
    };

    return (
        <div>
            <button type="button" className="btn btn-sm btn-warning modalBtn" data-bs-toggle="modal" style={{ color: 'white' }} data-bs-target="#exampleModal">Comment</button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Comment</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3" style={{ textAlign: 'left' }}>
                                <label htmlFor="message-text" className="col-form-label">Comment</label>
                                <textarea className="form-control" id="message-text" onChange={changeComment} value={admissionComment} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" onClick={handleSubmit} className="btn btn-primary" data-bs-dismiss="modal">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentModal;