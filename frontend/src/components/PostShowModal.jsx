import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Ratio from "react-bootstrap/Ratio";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import postService from "../services/posts";
import "bootstrap/dist/css/bootstrap.min.css";

const PostShowModal = ({ id }) => {
  const [show, setShow] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    imageURL: null,
  });

  useEffect(() => {
    const getPostData = async () => {
      const post = await postService.getPost(id);
      if (post && post.length > 0) {
        setPostData({
          title: post[0].title,
          content: post[0].content,
          imageURL: post[0].imageURL,
        });
      }
    };
    getPostData();
  }, [show]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="white"
          className="bi bi-arrow-up-right-square-fill"
          viewBox="0 0 16 16"
        >
          <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z" />
        </svg>
      </Button>

      <Modal show={show} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton />
        <Modal.Body>
          <Row>
            <Col sm={12} md={6}>
              <Ratio className="h-100">
                <Image
                  src={postData.imageURL}
                  fluid
                  style={{ objectFit: "cover" }}
                />
              </Ratio>
            </Col>
            <Col sm={12} md={6}>
              <Modal.Title>{postData.title}</Modal.Title>
              <div className="my-4" style={{ height: "50vh" }}>
                <span>{postData.content}</span>
              </div>
              <Modal.Footer></Modal.Footer>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PostShowModal;
