import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import postService from "../services/posts.js";

const PostEditModal = ({ id }) => {
  const [show, setShow] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
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

  const handleInputChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    // Preventing page reloading
    event.preventDefault();

    // Creating object
    const newPost = new FormData();
    newPost.set("title", postData.title);
    newPost.set("content", postData.content);
    // Sending object to the server
    const updatePost = async () => {
      await postService.updatePost(id, newPost);
    };
    updatePost();

    // Clearing up
    setPostData({
      title: "",
      content: "",
    });

    handleClose();
  };
  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="white"
          className="bi bi-pencil-fill"
          viewBox="0 0 16 16"
        >
          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
        </svg>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="PostCreate.ControlInputl">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                type="text"
                placeholder="Title"
                value={postData.title}
                onChange={handleInputChange}
                maxLength={50}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="PostCreate.ControlTextarea1"
            >
              <Form.Label>Content:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="content"
                placeholder={`What's on your mind?`}
                value={postData.content}
                onChange={handleInputChange}
                maxLength={1000}
              />
            </Form.Group>
            <Button variant="dark" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default PostEditModal;
