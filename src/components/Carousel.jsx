import React from "react";

class Carousel extends React.Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="carousel">
        <img
          src={
            images[active]["medium"] ??
            "http://pets-images.dev-apis.com/pets/none.jpg"
          }
          alt="animal"
        ></img>
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              onClick={() => this.setState({ active: index })}
              key={index}
              src={
                photo["medium"] ??
                "http://pets-images.dev-apis.com/pets/none.jpg"
              }
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
