import React from "react";

const Paginator = ({ meta, page, setPage, itemName }) => {
  return (
    <div className="flex justify-between items-center my-4">
      <button
        onClick={() => {
          if (meta?.current_page > 1) {
            setPage(page - 1);
          }
        }}
        className="bg-four text-one px-2 py-1 rounded font-semibold hover:opacity-50 transition-opacity delay-75"
      >
        Prev
      </button>
      <span className="text-four text-sm font-semibold">Page {page}</span>
      <span className="text-four text-sm font-semibold">
        Total {meta?.total} {itemName}
      </span>

      <button
        onClick={() => {
          if (meta?.current_page < meta?.last_page) {
            setPage(page + 1);
          }
        }}
        className="bg-four text-one px-2 py-1 rounded font-semibold hover:opacity-50 transition-opacity delay-75"
      >
        Next
      </button>
    </div>
  );
};

export default Paginator;
