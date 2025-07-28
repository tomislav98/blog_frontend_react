import "../styles/pagination.css";
import "../styles/global.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ count, blogsPerPage, currentPage, onPageChange }) {
  const totalPages = Math.ceil(count / blogsPerPage);

  return (
    <div className="footer-pagination">
      <button
        className="page-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft />
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`page-btn ${i + 1 === currentPage ? "active" : ""}`}
        >
          {i + 1}
        </button>
      ))}

      <button
        className="page-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight />
      </button>
    </div>
  );
}
export default Pagination;
