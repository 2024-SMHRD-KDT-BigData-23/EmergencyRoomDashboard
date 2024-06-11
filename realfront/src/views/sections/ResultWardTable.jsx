import React from 'react';
import { Table } from 'react-bootstrap';

const ResultWardTable = ({ resultWardList }) => {

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Staff</th>
                        <th>Disposition</th>
                    </tr>
                </thead>
                <tbody>
                    {resultWardList.map(resultWard => (
                        <tr key={resultWard.resultWardId}>
                            <td>{`${resultWard.resultWardUpdatedAt.month}/${resultWard.resultWardUpdatedAt.day} ${resultWard.resultWardUpdatedAt.hour}:${resultWard.resultWardUpdatedAt.minute}`}</td>
                            <td>{resultWard.staffId}</td>
                            <td>{resultWard.resultWard}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default ResultWardTable;