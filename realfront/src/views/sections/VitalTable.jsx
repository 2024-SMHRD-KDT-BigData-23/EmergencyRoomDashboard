import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import styled from 'styled-components';

// const HorizontalHeader = styled.th`
//   padding: 0.5rem 1rem;
//   text-align: center;
//   vertical-align: middle;
//   font-size: 1rem;
//   height: 5.8rem;
// `;

// const RowLabel = styled.td`
//   font-weight: bold;
//   text-align: center;
//   vertical-align: middle;
//   font-size: 0.9rem;
//   height: 3rem;
// `;

const FixedCol = styled.td`
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  font-size: 1.2rem;
  height: 3rem;
  position: sticky;
  left: 0;
  z-index: 1;
  width: 4rem;
  border-radius: 5%;
`;

const TableCell = styled.td`
  text-align: center;
  vertical-align: middle;
  font-size: 1.2rem;
  height: 3rem;
  cursor: ${({ isHovered }) => (isHovered ? 'pointer' : 'default')};
`;

const TableWrapper = styled.div`
  width: 95%;
  height: 93%;
  overflow-x: auto;
`;

const VitalTable = ({ data, onCellClick }) => {

    const [hoveredCell, setHoveredCell] = useState(null);

    const handleCellEnter = (rowIndex, columnIndex) => {
        setHoveredCell({ rowIndex, columnIndex });
    };

    const handleCellLeave = (rowIndex, columnIndex) => {
        setHoveredCell(null);
    };

    const handleCellClick = (rowIndex, columnIndex) => {
        onCellClick(rowIndex, columnIndex);
    };

    return (
        <TableWrapper>
            <Table hover className="m-0" style={{ width: 'max-content', height: '96%' }}>
                <tbody>
                    <tr>
                        <FixedCol style={{ backgroundColor: '#0c3d54', color: 'white' }}>MT</FixedCol>
                        {data.labels.map((label, labelIndex) => (
                            <TableCell key={labelIndex}
                                onClick={() => handleCellClick(-1, labelIndex)}
                                onMouseEnter={() => handleCellEnter(-1, labelIndex)}
                                onMouseLeave={() => handleCellLeave(-1, labelIndex)}
                                isHovered={
                                    hoveredCell &&
                                    hoveredCell.rowIndex === -1 &&
                                    hoveredCell.columnIndex === labelIndex
                                }
                            >
                                {label}
                            </TableCell>
                        ))}
                    </tr>
                    {data.datasets.map((dataset, datasetIndex) => (
                        <tr key={datasetIndex} onClick={() => handleCellClick(datasetIndex, -1)}>
                            <FixedCol style={{ backgroundColor: '#0c3d54', color: 'white' }}>{dataset.label}</FixedCol>
                            {dataset.data.map((value, valueIndex) => (
                                <TableCell key={`${datasetIndex}-${valueIndex}`}
                                    onClick={() => handleCellClick(datasetIndex, valueIndex)}
                                    onMouseEnter={() => handleCellEnter(datasetIndex, valueIndex)}
                                    onMouseLeave={() => handleCellLeave(datasetIndex, valueIndex)}
                                    isHovered={
                                        hoveredCell &&
                                        hoveredCell.rowIndex === datasetIndex &&
                                        hoveredCell.columnIndex === valueIndex
                                    }
                                >
                                    {value}
                                </TableCell>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </TableWrapper>
    );
};

export default VitalTable;
