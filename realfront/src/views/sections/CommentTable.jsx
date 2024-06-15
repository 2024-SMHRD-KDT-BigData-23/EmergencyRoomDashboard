import React from 'react';
import { Table } from 'react-bootstrap';
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
                    {currentItems.length > 0 ? (
                        currentItems.map((item) => (
                            <tr key={item.commentId} className="align-middle" style={{ height: '45.05px' }}>
                                <td>{`${item.commentUpdatedAt.month}.${item.commentUpdatedAt.day} ${item.commentUpdatedAt.hour}:${item.commentUpdatedAt.minute}`}</td>
                                <td>{item.staffId}</td>
                                <td>{item.comment}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="text-center py-3">
                                No data available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    );
}

export default CommentTable;