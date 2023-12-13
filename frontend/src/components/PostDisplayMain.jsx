import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Ratio from "react-bootstrap/Ratio";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PostShowModal from "./PostShowModal";
import postService from "../services/posts";
import "bootstrap/dist/css/bootstrap.min.css";

const Post = ({ id, imageURL, title }) => {
  return (
    <Card className="rounded my-3">
      <Ratio aspectRatio="4x3" className="h-100">
        <Card.Img src={imageURL} style={{ objectFit: "cover" }} />
      </Ratio>
      <Card.Body style={{ height: "110px" }}>
        <h5>{title}</h5>
      </Card.Body>
      <PostShowModal id={id} />
    </Card>
  );
};

const PostDisplayMain = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      setPosts(await postService.getAllPosts());
    };
    getPosts();
  });

  if (!posts || posts.length === 0) {
    return <div style={{marginTop: '40px', textAlign: 'center'}}>No posts yet</div>
  }

  return (
    <Container className="my-4">
      <Row className="d-flex justify-content-center">
        {posts.slice(0, 3).map((post, index) => (
          <Col sm={12} md={4} key={index}>
            {post && (
              <Post
                id={post.id}
                imageURL={post.imageURL}
                title={post.title}
                content={post.content}
              />
            )}
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PostDisplayMain;
