import React from "react";
import axios from "axios";
import { useInfiniteQuery } from "react-query";

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

const InfiniteQueries = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["colors"], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  if (isLoading) return <h2>Loading </h2>;
  if (isError) return <h2>{error.message} </h2>;

  console.log(data)

  return (
    <div>
      {data?.pages.map((group, i) => (
        <div key={i}>
          <h2>
            {" "}
            {group.data.map((color) => (
              <h2 key={color}>
                {color.id} : {color.label}
              </h2>
            ))}
          </h2>
        </div>
      ))}
      <div>
        <button disabled={!hasNextPage} onClick={fetchNextPage}>
          Load More
        </button>
      </div>

      <div>{isFetching && !isFetchingNextPage ? "fetching ...." : null}</div>
    </div>
  );
};

export default InfiniteQueries;
