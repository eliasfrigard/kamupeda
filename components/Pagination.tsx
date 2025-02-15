import React from "react";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const getPages = (): number[] => {
    const pages: number[] = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className='flex items-center justify-center space-x-2'>
      <button
        className={`px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-accent-500 hover:text-secondary-400 focus:outline-none duration-100 ${
          currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      {getPages()?.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none duration-100 ${
            page === currentPage
              ? "bg-primary-500 text-secondary-400"
              : "text-gray-700 bg-gray-200 hover:bg-accent-500 hover:text-secondary-400"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        className={`px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-accent-500 hover:text-secondary-400 focus:outline-none duration-100 ${
          currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

// Usage Example
// import Pagination from './Pagination';

// const App: React.FC = () => {
//   const [currentPage, setCurrentPage] = React.useState<number>(1);
//   const totalPages = 10;

//   const handlePageChange = (page: number): void => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <Pagination
//         totalPages={totalPages}
//         currentPage={currentPage}
//         onPageChange={handlePageChange}
//       />
//     </div>
//   );
// };

// export default App;
