import React, { useState } from 'react';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';
import '../../assets/scss/maintable.scss';
import usePagination from '../../hooks/usePagination';
// import CommentModal from '../../components/core/commentmodal';

const CommentTable = ({ commentList, staffId, admissionId, comment, setComment }) => {

    const { currentItems, pageNumbers, paginate, currentPage, prevPage, nextPage } = usePagination(commentList, 1);

    return (
        <>
            <Table className="mb-0">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Staff</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item) => (
                        <tr key={item.commentId}>
                            <td>{`${item.commentUpdatedAt.month}.${item.commentUpdatedAt.day} ${item.commentUpdatedAt.hour}:${item.commentUpdatedAt.minute}`}</td>
                            <td>{item.staffId}</td>
                            <td>{item.comment}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <button className="page-link" onClick={prevPage}>이전</button>
                </li>
                <li className="page-item">
                    <button className="page-link" onClick={nextPage}>다음</button>
                </li>
            </ul>
            {/* <CommentModal staffId={staffId} admissionId={admissionId} comment={comment} setComment={setComment} /> */}
        </>
    );
}

export default CommentTable;