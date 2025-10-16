import apiClient from "../services/apiClient";

const fetchBreedList = async ({ queryKey }) => {
  const animal = queryKey[1].animal;
  if (!animal) {
    return [];
  }
  const { data } = await apiClient.get(`/types/${animal}/breeds`);
  return data.breeds;
};

export default fetchBreedList;
