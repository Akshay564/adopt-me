import apiClient from "../services/apiClient";

const fetchPetDetails = async ({ queryKey }) => {
  const petId = queryKey[1].petId;
  const { data } = await apiClient.get(`/animals/${petId}`);

  return data;
};

export default fetchPetDetails;
