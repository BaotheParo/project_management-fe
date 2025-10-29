import { CaretLeft, CaretRight } from "phosphor-react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showingText = "Showing 1 to 10 of 247 results",
}) {
  const handlePrevious = () => {
    onPageChange(Math.max(1, currentPage - 1));
  };

  const handleNext = () => {
    onPageChange(Math.min(totalPages, currentPage + 1));
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <div className="flex items-center justify-between px-8 py-6 bg-white">
      <span className="text-[12px] font-normal text-black">{showingText}</span>

      <div className="flex items-center gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="flex items-center gap-1 bg-white text-[12px] font-semibold text-black hover:text-[#626AE7] disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          <CaretLeft size={10} />
          Previous
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`w-8 h-8 rounded-full text-[12px] font-medium flex items-center justify-center transition-colors ${
                currentPage === page
                  ? "bg-[#626AE7] text-white"
                  : "bg-white text-[#727674] hover:text-black"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 bg-white text-[12px] font-medium text-black hover:text-[#626AE7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <CaretRight size={10} />
        </button>
      </div>
    </div>
  );
}
