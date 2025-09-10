import { QueryFunction } from "@tanstack/react-query";
import { Animal, BreedListAPIResponse } from "./ApiResponsesTypes";

const fetchBreedList: QueryFunction<
  BreedListAPIResponse,
  ["breeds", { animal: Animal }]
> = async ({ queryKey }) => {
  const animal = queryKey[1].animal;

  if (!animal) {
    return [];
  }
  const res = await fetch(
    `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
  );
  return res.json();
};

export default fetchBreedList;
