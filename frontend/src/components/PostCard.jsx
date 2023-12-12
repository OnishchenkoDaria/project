import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Ratio from "react-bootstrap/Ratio";
import Button from "react-bootstrap/Button";
import PostShowModal from "./PostShowModal";
import PostEditModal from "./PostEditModal.jsx";
import postService from "../services/posts.js";
import registerService from "../services/registerForm.js";
import "bootstrap/dist/css/bootstrap.min.css";

const PostCard = ({ id }) => {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    imageURL: null,
  });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const updateData = async () => {
      const post = await postService.getPost(id);
      if (post && post.length > 0) {
        setPostData({
          title: post[0].title,
          content: post[0].content,
          imageURL: post[0].imageURL,
        });
      }
      setIsAdmin((await registerService.getRole()) === "admin");
    };
    updateData();
  });

  const handleDelete = () => {
    postService.deletePost(id);
  };

  return (
    <Card
      className="bg-dark text-white mt-4 lg-4 sm-6"
      style={{ height: "200px" }}
    >
      <Ratio className="h-100">
        <Card.Img src={postData.imageURL} style={{ objectFit: "cover" }} />
      </Ratio>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the alpha value for darkness
        }}
      />
      <Card.ImgOverlay>
        <Card.Body style={{ height: "110px" }}>
          <h3>{postData.title}</h3>
        </Card.Body>
        <Card.Footer>
          <PostShowModal id={id} />
          {isAdmin && (
            <>
              <Button variant="dark" onClick={handleDelete} className="mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="white"
                  className="bi bi-trash-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                </svg>
              </Button>
              <PostEditModal id={id} />
            </>
          )}
        </Card.Footer>
      </Card.ImgOverlay>
    </Card>
  );
};

export default PostCard;
