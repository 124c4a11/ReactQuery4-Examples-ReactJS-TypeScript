import { useParams } from "react-router-dom";
import { useHeroData } from "../hooks/useHeroData";
import { AxiosError, AxiosResponse } from "axios";
import { IHero } from "../types/IHero";

export function HeroPage() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useHeroData(id);

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : isError ? (
        <h2>{(error as AxiosError).message}</h2>
      ) : (
        data && (
          <h1>
            {data?.name} - {data?.alterEgo}
          </h1>
        )
      )}
    </>
  );
}
