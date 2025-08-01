import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import fetchPetDetails from "./fetchPetDetails";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";

const Details = () => {
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

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button>Adopt {pet.name}</button>
        <p>{pet.description}</p>
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
