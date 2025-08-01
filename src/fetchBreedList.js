const fetchBreedList = async ({ queryKey }) => {
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
