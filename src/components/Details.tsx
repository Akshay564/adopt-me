import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { useContext, useState } from "react";
import Modal from "./Modal";
import AdoptedPetContext from "../context/AdoptedPetContext";
import fetchPetDetails from "../api/fetchPetDetails";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";

const Details = () => {
  const navigate = useNavigate();
  const context = useContext(AdoptedPetContext);

  if (!context) {
    throw new Error(
      "SomeComponent must be used within an AdoptedPetContext.Provider"
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setAdoptedPet] = context;

  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  if (!id) {
    throw new Error("ID isn't provided");
  }
  const { isFetching, isError, data, error } = useQuery({
    queryKey: ["details", { petId: id }],
    queryFn: fetchPetDetails,
  });

  if (isFetching) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  if (isError) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return <span>Error: {errorMessage}</span>;
  }

  const pet = data?.pets[0];

  if (!pet) {
    throw new Error("No Pet");
  }

  const handleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button onClick={handleModal}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal onClose={handleModal}>
            <div>
              <h2>Would you like to adopt {pet.name}?</h2>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={handleModal}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
