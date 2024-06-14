import React from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import '../../assets/scss/maintable.scss';

const CommentTable = ({ currentItems }) => {

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
                        <tr key={item.commentId} className="align-middle" style={{ height : '45.05px' }}>
                            <td>{`${item.commentUpdatedAt.month}.${item.commentUpdatedAt.day} ${item.commentUpdatedAt.hour}:${item.commentUpdatedAt.minute}`}</td>
                            <td>{item.staffId}</td>
                            <td>{item.comment}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default CommentTable;