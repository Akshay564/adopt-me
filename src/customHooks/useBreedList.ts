import { QueryStatus, useQuery } from "@tanstack/react-query";
import { Animal } from "../api/ApiResponsesTypes";
import fetchBreedList from "../api/fetchBreedList";

export default function useBreedList(animal: Animal) {
  const { data, status } = useQuery({
    queryKey: ["breeds", { animal }],
    queryFn: fetchBreedList,
  });

  return [data?.breeds ?? [], status] as [string[], QueryStatus];
}
