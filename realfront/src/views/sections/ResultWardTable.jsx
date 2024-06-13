import React from 'react';
import { Table } from 'react-bootstrap';
import '../../assets/scss/maintable.scss';
import usePagination from '../../hooks/usePagination';
import DecisionDrop from '../../components/core/decisionmodal';

const ResultWardTable = ({ resultWardList, staffId, admissionId, setResultWard }) => {
    const { currentItems, pageNumbers, paginate, currentPage, prevPage, nextPage } = usePagination(resultWardList, 2);
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
                    {/* {resultWardList.map(resultWard => (
                        <tr key={resultWard.resultWardId}>
                            <td>{`${resultWard.resultWardUpdatedAt.month}.${resultWard.resultWardUpdatedAt.day} ${resultWard.resultWardUpdatedAt.hour}:${resultWard.resultWardUpdatedAt.minute}`}</td>
                            <td>{resultWard.staffId}</td>
                            <td>{resultWard.resultWard}</td>
                        </tr>
                    ))} */}
                    {currentItems.map((item) => (
                        <tr key={item.resultWardId}>
                            <td>{`${item.resultWardUpdatedAt.month}.${item.resultWardUpdatedAt.day} ${item.resultWardUpdatedAt.hour}:${item.resultWardUpdatedAt.minute}`}</td>
                            <td>{item.staffId}</td>
                            <td>{item.resultWard}</td>
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
            <DecisionDrop staffId={staffId} admissionId={admissionId} setResultWard={setResultWard} />
        </>
    );
}

export default ResultWardTable;