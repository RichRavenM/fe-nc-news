import { useState } from "react";

const Pages = ({ pageTotal, setPage, page }) => {
  const [currPage, setCurrPage] = useState(1);
  const pagesToShow = Array(pageTotal).fill(0);
  for (let i = 0; i < pagesToShow.length; i++) {
    pagesToShow[i] = i + 1;
  }

  const changePage = (pageToShow) => {
    setPage(pageToShow);
    setCurrPage(pageToShow);
  };

  return (
    <ul className="pages">
      {pagesToShow.map((pageToShow) => {
        return (
          <li key={pageToShow}>
            <button
              disabled={currPage === pageToShow}
              onClick={() => {
                changePage(pageToShow);
              }}
            >
              {pageToShow}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Pages;
