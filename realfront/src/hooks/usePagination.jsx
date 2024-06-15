import { useState } from 'react';

const usePagination = (items, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  // 현재 페이지에 해당하는 아이템들을 계산합니다.
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 번호 배열을 생성합니다.
  const pageNumbers = [];
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const maxVisiblePages = 10; // 최대 표시할 페이지 번호 개수

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    let startPage = currentPage - Math.floor(maxVisiblePages / 2);
    let endPage = currentPage + Math.floor(maxVisiblePages / 2);

    if (startPage < 1) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (endPage > totalPages) {
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages;
    }

    if (startPage > 1) {
      pageNumbers.push(1);
      pageNumbers.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }
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
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToFirstPage = () => {
    paginate(pageNumbers[0]);
  };

  const goToLastPage = () => {
    paginate(pageNumbers[pageNumbers.length - 1]);
  };

  return { currentItems, pageNumbers, paginate, currentPage, prevPage, nextPage, goToFirstPage, goToLastPage };
};

export default usePagination;
