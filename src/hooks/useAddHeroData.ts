import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IHero } from "../types/IHero";
import axios from "axios";

const addHero = (hero: Omit<IHero, "id">) =>
  axios.post<IHero>(`http://localhost:4000/superheroes`, hero);

export const useAddHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addHero,
    onSuccess: () => queryClient.invalidateQueries(["heroes"]),
  });
};
