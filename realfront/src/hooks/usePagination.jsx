import { useState } from 'react';

const usePagination = (items, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  // 현재 페이지에 해당하는 아이템들을 계산합니다.
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 번호 배열을 생성합니다.
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // 페이지 번호 클릭 시 현재 페이지 상태를 업데이트합니다.
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 이전 페이지로 이동합니다.
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 다음 페이지로 이동합니다.
  const nextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return { currentItems, pageNumbers, paginate, currentPage, prevPage, nextPage };
};

export default usePagination;