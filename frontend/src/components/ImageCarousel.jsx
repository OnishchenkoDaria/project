import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Ratio from "react-bootstrap/Ratio";
import "bootstrap/dist/css/bootstrap.min.css";
import photo1 from "../assets/photo1.jpg"
import photo2 from "../assets/photo2.jpg"
import photo3 from "../assets/photo3.jpg"
import photo4 from "../assets/photo4.jpg"
import photo5 from "../assets/photo5.jpg"

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
        src={imageURL}
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

  const imageImports =[photo1, photo2, photo3, photo4, photo5]
  const text = ['Model: @__kuzenka__','Model: @juli.fitbody','Model: @_minash','Models: @vitalii.perovskii & @valeria_nek', 'Model: @anastaceyk']

  return (
    <Row className="d-flex justify-content-center">
      <Col md={8} className="my-5">
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {imageImports.map((imageUrl, idx) => (
            <Carousel.Item key={idx}>
                <CarouselImage imageURL={imageUrl}/>
                  <Carousel.Caption>
                    <TextWithBackground text={text[idx]} />
                  </Carousel.Caption>
             </Carousel.Item>
          ))}
        </Carousel>
      </Col>
    </Row>
  );
}

export default ImageCarousel;
