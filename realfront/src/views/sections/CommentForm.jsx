import React, { useState } from 'react';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';
import '../../assets/scss/maintable.scss';

const CommentForm = ({ staffId, admissionId, comment, setComment }) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:8080/api/ER/comments/${staffId}/${admissionId}`, {
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
            <Form onSubmit={handleSubmit} className="d-flex justify-content-between align-items-end">
                <Form.Group controlId="formComment" className="flex-grow-1">
                    <Form.Control
                        as="textarea"
                        rows={1}
                        placeholder="Write Patient Status.."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="ms-3">
                    Save
                </Button>
            </Form>
        </>
    );
}

export default CommentForm;