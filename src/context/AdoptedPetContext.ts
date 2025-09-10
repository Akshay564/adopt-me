// AdoptedPetContext.tsx
import { createContext } from "react";
import { Pet } from "../api/ApiResponsesTypes";

type AdoptedPetContextType = [
  Pet | null,
  React.Dispatch<React.SetStateAction<Pet | null>>
];

const AdoptedPetContext = createContext<AdoptedPetContextType | undefined>(
  undefined
);

export default AdoptedPetContext;
