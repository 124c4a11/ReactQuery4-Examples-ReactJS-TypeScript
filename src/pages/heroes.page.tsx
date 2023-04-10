import { AxiosError, AxiosResponse } from "axios";
import { useHeroesData } from "../hooks/useHeroesData";
import { IHero } from "../types/IHero";
import { Link } from "react-router-dom";

const onSuccess = (data: IHero[]) =>
  console.log("Perform side effect after data fetching", data);

const onError = (error: AxiosError) =>
  console.log("Perform side effect after encountering error", error);

const select = (data: AxiosResponse<IHero[]>) => data.data;

export function HeroesPage() {
  const { data, isInitialLoading, isError, error, refetch } = useHeroesData({
    // enabled: false,
    onError,
    onSuccess,
    select,
  });

  return (
    <>
      <h1>Heroes Page</h1>

      {/* <button onClick={() => refetch()}>Fetch Heroes</button> */}

      {isInitialLoading ? (
        <h2>Loading...</h2>
      ) : isError ? (
        <h2>{error.message}</h2>
      ) : (
        <>
          {!!data?.length && (
            <ul>
              {data.map(({ id, name }) => (
                <li key={id}>
                  <Link to={`/hero/${id}`}>{name}</Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
}
