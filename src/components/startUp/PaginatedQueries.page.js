import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

const fetchColors = (pageNumber) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
};

const PaginatedQueries = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["colors", pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) return <h2>Loading </h2>;
  if (isError) return <h2>{error.message} </h2>;

  return (
    <div>
      <button
        onClick={() => setPageNumber(pageNumber + 1)}
        disabled={pageNumber === 4}
      >
        Get Next Page
      </button>
      <button
        onClick={() => setPageNumber(pageNumber - 1)}
        disabled={pageNumber === 1}
      >
        Get Previous Page
      </button>

      {data?.data.map((color, i) => (
        <div key={i}>
          <h2>
            {" "}
            <strong>{color.id} </strong> . {color.label}
          </h2>
        </div>
      ))}
      {isFetching && "Loading"}
    </div>
  );
};

export default PaginatedQueries;
