import React from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import '../../assets/scss/maintable.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const CommentForm = ({ pageNumbers, prevPage, nextPage, staffId, admissionId, comment, setComment }) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://3.144.162.188:8080/api/ER/comments/${staffId}/${admissionId}`, {
            comment: comment
        })
            .then(response => {
                alert("comment 작성 완료");
                setComment('');
            })
            .catch(error => {
                alert("comment 작성 실패");
            });
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
            <Form onSubmit={handleSubmit} className="d-flex justify-content-end flex-grow-1 align-items-center ms-1">
                <Form.Group controlId="formComment" className="flex-grow-1">
                    <Form.Control
                        as="textarea"
                        rows={1}
                        placeholder="Write down the patient's condition"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="ms-2">
                    Save
                </Button>
            </Form>
        </>
    );
}

export default CommentForm;