import Pet from "./Pet";

const Results = ({ pets, isLoading }) => {
  return (
    <div className="search">
      {isLoading ? (
        <h1>Fetching Results</h1>
      ) : !pets?.length ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((pet) => {
          return (
            <Pet
              key={pet.id}
              animal={pet.animal}
              name={pet.name}
              breed={pet.breed}
              images={pet.images}
              location={`${pet.city}, ${pet.state}`}
              id={pet.id}
            />
          );
        })
      )}
    </div>
  );
};

export default Results;
