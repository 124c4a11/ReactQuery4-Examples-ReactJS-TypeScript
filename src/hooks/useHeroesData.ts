import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { IHero } from "../types/IHero";

const fetchHeroes = () =>
  axios.get<IHero[]>("http://localhost:4000/superheroes");

export const useHeroesData = <S = AxiosResponse<IHero[]>>(
  options?: UseQueryOptions<
    AxiosResponse<IHero[]>,
    AxiosError,
    S, // return type of "select" option. A typescript error may be highlighted if the type does not match the type of the argument in the function onSuccess. To solve this problem, you need to fix the type of the function onSuccess argument.
    ["heroes"] // useQuery key - ["heroes"]
  >
) =>
  useQuery({
    queryKey: ["heroes"],
    queryFn: fetchHeroes,
    ...options,
  });
