import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Ratio from "react-bootstrap/Ratio";
import "bootstrap/dist/css/bootstrap.min.css";

const TextWithBackground = ({ text }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the alpha value for darkness
      }}
    >
      <p>{text}</p>
    </div>
  );
};

const CarouselImage = ({ imageURL }) => {
  return (
    <Ratio aspectRatio="16x9">
      <Image
        src="https://placehold.co/600x400"
        fluid
        style={{ objectFit: "cover" }}
      />
    </Ratio>
  );
};

function ImageCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Row className="d-flex justify-content-center">
      <Col md={8} className="my-5">
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <CarouselImage />
            <Carousel.Caption>
              <TextWithBackground text="Nulla vitae elit libero, a pharetra augue mollis interdum." />
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <CarouselImage />
            <Carousel.Caption>
              <TextWithBackground text="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <CarouselImage />
            <Carousel.Caption>
              <TextWithBackground text="Praesent commodo cursus magna, vel scelerisque nisl consectetur." />
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Col>
    </Row>
  );
}

export default ImageCarousel;
