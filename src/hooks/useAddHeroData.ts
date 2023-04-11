import { QueryCache, useMutation, useQueryClient } from "@tanstack/react-query";
import { IHero } from "../types/IHero";
import axios, { AxiosResponse } from "axios";

const addHero = (hero: Omit<IHero, "id">) =>
  axios.post<IHero>(`http://localhost:4000/superheroes`, hero);

export const useAddHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addHero,

    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries(["heroes"]);

    //   queryClient.setQueryData<AxiosResponse<IHero[]> | undefined>(
    //     ["heroes"],
    //     (oldQueryData) =>
    //       oldQueryData
    //         ? {
    //             ...oldQueryData,
    //             data: [...oldQueryData.data, data.data],
    //           }
    //         : oldQueryData
    //   );
    // },

    onMutate: async (newHero) => {
      await queryClient.cancelQueries(["heroes"]);

      const prevHeroData = queryClient.getQueryData(["heroes"]);

      queryClient.setQueryData<AxiosResponse<IHero[]> | undefined>(
        ["heroes"],
        (oldQueryData) =>
          oldQueryData
            ? {
                ...oldQueryData,
                data: [
                  ...oldQueryData.data,
                  {
                    id: oldQueryData?.data?.length + 1,
                    ...newHero,
                  },
                ],
              }
            : oldQueryData
      );

      return { prevHeroData };
    },

    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["heroes"], context?.prevHeroData);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["heroes"]);
    },
  });
};
