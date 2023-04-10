import { useQueries } from "@tanstack/react-query";
import axios from "axios";

interface DynamicParallelQueriesPageProps {
  heroIDs: string[];
}

const fetchHero = (id: string) =>
  axios.get(`http://localhost:4000/superheroes/${id}`);

export function DynamicParallelQueriesPage({
  heroIDs,
}: DynamicParallelQueriesPageProps) {
  const queryResults = useQueries({
    queries: heroIDs.map((id) => ({
      queryKey: ["hero", id],
      queryFn: () => fetchHero(id),
    })),
  });

  console.log(queryResults);

  return <h1>Dynamic Parallel Queries</h1>;
}
