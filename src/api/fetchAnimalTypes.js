import apiClient from "../services/apiClient";

const fetchAnimalTypes = async () => {
  const { data } = await apiClient.get(`/types`);
  return data;
};

export default fetchAnimalTypes;
