import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { IHero } from "../types/IHero";

const fetchHeroes = () =>
  axios.get<IHero[]>("http://localhost:4000/superheroes");

export function HeroesPage() {
  const { data, isInitialLoading, isError, error, refetch } = useQuery(
    ["heroes"],
    fetchHeroes,
    { enabled: false }
  );

  return (
    <>
      <h1>Heroes Page</h1>

      <button onClick={() => refetch()}>Fetch Heroes</button>

      {isInitialLoading ? (
        <h2>Loading...</h2>
      ) : isError ? (
        <h2>{(error as AxiosError).message}</h2>
      ) : (
        <>
          {!!data?.data?.length && (
            <ul>
              {data?.data.map(({ name }) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
}
