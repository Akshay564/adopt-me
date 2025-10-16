import { useContext, useState } from "react";
import useBreedList from "../customHooks/useBreedList";
import Results from "./Results";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "../api/fetchSearch";
import AdoptedPetContext from "../context/AdoptedPetContext";
import fetchAnimalTypes from "../api/fetchAnimalTypes";

const SearchParams = () => {
  const [adoptedPet] = useContext(AdoptedPetContext);
  const [requestParams, setRequestParams] = useState({
    location: "",
    type: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);

  const { data: animalTypesData } = useQuery({
    queryKey: ["animalTypes"],
    queryFn: fetchAnimalTypes,
  });

  const animalTypes = animalTypesData?.types?.map((type) => type.name) ?? [];

  const { data, isLoading } = useQuery({
    queryKey: ["search", requestParams],
    queryFn: fetchSearch,
    params: requestParams,
  });

  const pets = data?.animals ?? [];

  const updateParams = (e) => {
    const formData = new FormData(e.target);
    const obj = {
      type: formData.get("animal") ?? "",
      breed: formData.get("breed") ?? "",
      location: formData.get("location") ?? "",
    };
    setRequestParams(obj);
  };

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateParams(e);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.photos[0].medium} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input name="location" id="location" placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            name="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option></option>
            {animalTypes.map((animal, index) => (
              <option key={index}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select id="breed" name="breed">
            <option></option>
            {breeds.map((breed) => (
              <option key={breed.name}>{breed.name}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} isLoading={isLoading} />
    </div>
  );
};

export default SearchParams;
