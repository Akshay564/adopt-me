import apiClient from "../services/apiClient";

const fetchSearch = async ({ queryKey }) => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(queryKey[1])) {
    if (value) params.append(key, value);
  }
  const { data } = await apiClient.get(`/animals`, {
    params,
  });
  return data;
};

export default fetchSearch;
