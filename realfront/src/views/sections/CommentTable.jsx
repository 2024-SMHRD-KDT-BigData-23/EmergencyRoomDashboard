import React from 'react';
import { Table } from 'react-bootstrap';

const CommentTable = ({ commentList }) => {

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
                    {commentList.map(comment => (
                        <tr key={comment.commentId}>
                            <td>{`${comment.commentUpdatedAt.month}/${comment.commentUpdatedAt.day} ${comment.commentUpdatedAt.hour}:${comment.commentUpdatedAt.minute}`}</td>
                            <td>{comment.staffId}</td>
                            <td>{comment.comment}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default CommentTable;