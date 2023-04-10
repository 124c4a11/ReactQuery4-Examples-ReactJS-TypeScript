import { useParams } from "react-router-dom";
import { useInitialHeroData } from "../hooks/useInitialHeroData";

export function HeroPage() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useInitialHeroData(id);

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : isError ? (
        <h2>{error.message}</h2>
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
