import React from 'react'
import "../../styles/pagination.css";

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <nav className='d-flex justify-content-center' aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </a>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index}
            className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            <a className="page-link" href="#">
              {index + 1}
            </a>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
