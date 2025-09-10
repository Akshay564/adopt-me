import { QueryFunction } from "@tanstack/react-query";
import { PetAPIResponse } from "./ApiResponsesTypes";

const fetchPetDetails: QueryFunction<
  PetAPIResponse,
  ["details", { petId: string }]
> = async ({ queryKey }) => {
  const petId = queryKey[1].petId;
  const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${petId}`);

  return apiRes.json();
};

export default fetchPetDetails;
