// React와 필요한 훅(useState, useEffect)을 불러옵니다.
import React, { useEffect, useState } from 'react';
// Axios를 불러옵니다. Axios는 HTTP 요청을 쉽게 할 수 있도록 도와주는 라이브러리입니다.
import axios from 'axios';

const PaginationExample = () => {
    // 상태를 정의합니다. data는 전체 데이터를 저장하고, currentPage는 현재 페이지 번호를 저장하며, itemsPerPage는 한 페이지에 표시할 항목 수를 저장합니다.
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // useEffect 훅은 컴포넌트가 마운트될 때 실행됩니다. 여기서는 데이터를 가져오는 비동기 함수를 정의하고 호출합니다.
    useEffect(() => {
        // fetchData 함수는 데이터를 가져와서 data 상태에 저장합니다.
        const fetchData = async () => {
            try {
                // Axios를 사용하여  API로부터 데이터를 가져옵니다.
                const response = await axios.get('http://localhost:8080/patients');
                // 가져온 데이터를 data 상태에 설정합니다.
                setData(response.data);
            } catch (error) {
                // 데이터 가져오기 실패 시 에러를 콘솔에 출력합니다.
                console.error('Error fetching data:', error);
            }
        };

        // fetchData 함수를 호출하여 데이터를 가져옵니다.
        fetchData();
    }, []); // 빈 배열을 두 번째 인자로 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

    // 현재 페이지에 표시할 데이터를 계산합니다.
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // 페이지를 변경하는 함수입니다.
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // 총 페이지 수를 계산하고 페이지 번호를 배열에 저장합니다.
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    // 컴포넌트 렌더링 부분입니다.
    return (
        <div>
            {/* 페이지 제목을 표시합니다. */}
            <h1>Pagination Example</h1>
            {/* 현재 페이지의 데이터를 목록으로 렌더링합니다. */}
            <ul>
                {currentItems.map(item => (
                    // 각 항목의 이름을 렌더링합니다. 여기서는 고유한 키로 item.id를 사용합니다.
                    <li key={item.id}>
                        {item.name}
                    </li>
                ))}
            </ul>
            {/* 페이지네이션 네비게이션을 렌더링합니다. */}
            <nav>
                <ul className="pagination">
                    {pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            {/* 페이지 번호를 클릭하면 paginate 함수가 호출되어 페이지가 변경됩니다. */}
                            <a onClick={() => paginate(number)} href="!#" className="page-link">
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

// PaginationExample 컴포넌트를 기본으로 내보냅니다.
export default PaginationExample;
