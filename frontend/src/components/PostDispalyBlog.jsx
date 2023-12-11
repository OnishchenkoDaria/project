import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PostCard from "./PostCard";
import postService from "../services/posts";
import "../styles/PostCreateModal.css";

const PostDisplayBlog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      setPosts(await postService.getAllPosts());
    };
    getPosts();
  });

  return (
    <Container lg={8} fluid="md">
      <Row className="justify-content-center">
        {posts.map((post, index) => {
          return (
            <Col sm={6} lg={4} key={index}>
              <PostCard id={post.id} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default PostDisplayBlog;
