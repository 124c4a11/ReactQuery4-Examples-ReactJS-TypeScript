import { AxiosError, AxiosResponse } from "axios";
import { useHeroesData } from "../hooks/useHeroesData";
import { IHero } from "../types/IHero";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAddHeroData } from "../hooks/useAddHeroData";

const onSuccess = (data: IHero[]) =>
  console.log("Perform side effect after data fetching", data);

const onError = (error: AxiosError) =>
  console.log("Perform side effect after encountering error", error);

const select = (data: AxiosResponse<IHero[]>) => data.data;

export function HeroesPage() {
  const [name, setName] = useState<string>("");
  const [alterEgo, setAlterEgo] = useState<string>("");

  const { data, isInitialLoading, isError, error, refetch } = useHeroesData({
    // enabled: false,
    onError,
    onSuccess,
    select,
  });

  const { mutate: addHero } = useAddHeroData();

  const onAddHero = () => addHero({ name, alterEgo });

  return (
    <>
      <h1>Heroes Page</h1>

      <div>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="alter ego"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={onAddHero}>Add Hero</button>
      </div>

      <button onClick={() => refetch()}>Fetch Heroes</button>

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
