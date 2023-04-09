import {
  QueryFunctionContext,
  UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { IHero } from "../types/IHero";

const fetchHero = ({ queryKey }: QueryFunctionContext) => {
  const id = queryKey[1]; //  queryKey: ["hero", heroId]

  return axios.get<IHero>(`http://localhost:4000/superheroes/${id}`);
};

export const useHeroData = <S = IHero>( // <S = IHero> IHero - the return type of the default "select" function
  heroId: string | undefined,
  options?: UseQueryOptions<
    AxiosResponse<IHero>,
    AxiosError,
    S, // return type of "select" function. A typescript error may be highlighted if the type does not match the type of the argument in the function onSuccess. To solve this problem, you need to fix the type of the function onSuccess argument.
    ["hero", string | undefined] // useQuery key - ["hero", heroId]
  >
) =>
  useQuery({
    queryKey: ["hero", heroId],
    queryFn: fetchHero,
    select: (data: AxiosResponse<IHero>) => data.data as S,
    ...options,
  });
