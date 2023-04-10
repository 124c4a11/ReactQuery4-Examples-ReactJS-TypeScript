import axios, { AxiosError } from "axios";
import { IColor } from "../types/IColor";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const fetchColors = (pageNumber: number) =>
  axios.get<IColor[]>(
    `http://localhost:4000/colors?_limit=2&_page=${pageNumber}`
  );

export function PaginatedQueries() {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["colors", pageNumber],
    queryFn: () => fetchColors(pageNumber),
    select: (data) => data.data,
    keepPreviousData: true,
  });

  return (
    <>
      <h1>Paginated Queries</h1>

      {isLoading ? (
        <h2>Loading...</h2>
      ) : isError ? (
        <h2>{(error as AxiosError).message}</h2>
      ) : (
        <>
          {!!data?.length && (
            <ul>
              {data.map(({ id, label }) => (
                <li key={id}>{label}</li>
              ))}
            </ul>
          )}
          <div>
            <button
              onClick={() => setPageNumber((prev) => --prev)}
              disabled={pageNumber === 1}
            >
              Prev page
            </button>

            <span>{pageNumber}</span>

            <button
              onClick={() => setPageNumber((prev) => ++prev)}
              disabled={pageNumber === 4}
            >
              Next page
            </button>
          </div>
        </>
      )}
    </>
  );
}
