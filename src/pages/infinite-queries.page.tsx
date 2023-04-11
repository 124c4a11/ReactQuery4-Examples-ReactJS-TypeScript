import axios, { AxiosError } from "axios";
import { IColor } from "../types/IColor";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment } from "react";

const fetchColors = ({ pageParam = 1 }) =>
  axios.get<IColor[]>(
    `http://localhost:4000/colors?_limit=2&_page=${pageParam}`
  );

export function InfiniteQueriesPage() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["colors"],
    queryFn: fetchColors,
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) return pages.length + 1;

      return undefined;
    },
  });

  return (
    <>
      <h1>Infinite Queries</h1>

      {isLoading ? (
        <h2>Loading...</h2>
      ) : isError ? (
        <h2>{(error as AxiosError).message}</h2>
      ) : (
        <>
          {!!data?.pages.length && (
            <ul>
              {data.pages.map((group, ndx) => (
                <Fragment key={ndx}>
                  {group.data.map(({ id, label }) => (
                    <li key={id}>{label}</li>
                  ))}
                </Fragment>
              ))}
            </ul>
          )}

          <div>
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              Load more
            </button>
          </div>

          <div>{isFetching && "Fetching..."}</div>
        </>
      )}
    </>
  );
}
