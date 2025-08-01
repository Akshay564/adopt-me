import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import fetchPetDetails from "../api/fetchPetDetails";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import { useContext, useState } from "react";
import Modal from "./Modal";
import AdoptedPetContext from "../context/AdoptedPetContext";

const Details = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
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
    return <span>Error: {error.message}</span>;
  }

  const pet = data.pets[0];

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
