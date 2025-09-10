import { useContext, useState } from "react";
import Results from "./Results";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "../context/AdoptedPetContext";
import { Animal } from "../api/ApiResponsesTypes";
import useBreedList from "../customHooks/useBreedList";
import fetchSearch from "../api/fetchSearch";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const context = useContext(AdoptedPetContext);

  if (!context) {
    throw new Error(
      "SomeComponent must be used within an AdoptedPetContext.Provider"
    );
  }

  const [adoptedPet] = context;

  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "" as Animal,
    breed: "",
  });
  const [animal, setAnimal] = useState("" as Animal);
  const [breeds] = useBreedList(animal);

  const { data } = useQuery({
    queryKey: ["search", requestParams],
    queryFn: fetchSearch,
  });

  const pets = data?.pets ?? [];

  const updateParams = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const obj = {
      animal: (formData.get("animal")?.toString() as Animal) ?? "",
      breed: formData.get("breed")?.toString() ?? "",
      location: formData.get("location")?.toString() ?? "",
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
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
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
              setAnimal(e.target.value as Animal);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value as Animal);
            }}
          >
            <option></option>
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select disabled={breeds.length === 0} id="breed" name="breed">
            <option></option>
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
