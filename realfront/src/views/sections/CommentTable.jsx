import React from 'react';
import { Table } from 'react-bootstrap';
import '../../assets/scss/maintable.scss';
import usePagination from '../../hooks/usePagination';
import CommentModal from '../../components/core/commentmodal';

const CommentTable = ({ commentList, staffId, admissionId, setComment }) => {
    const { currentItems, pageNumbers, paginate, currentPage, prevPage, nextPage } = usePagination(commentList, 2);

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Staff</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {commentList.map(comment => (
                        <tr key={comment.commentId}>
                            <td>{`${comment.commentUpdatedAt.month}/${comment.commentUpdatedAt.day} ${comment.commentUpdatedAt.hour}:${comment.commentUpdatedAt.minute}`}</td>
                            <td>{comment.staffId}</td>
                            <td>{comment.comment}</td>
                        </tr>
                    ))} */}
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
            <CommentModal staffId={staffId} admissionId={admissionId} setComment={setComment} />
        </>
    );
}

export default CommentTable;