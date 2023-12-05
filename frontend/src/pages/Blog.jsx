import React from 'react';
import PostCard from '../components/PostCard.jsx'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import postService from '../services/posts.js'

import PostShowModal from '../components/PostShowModal.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'

const cards = await postService.getAll()

const Blog = () => {
  
  return (
    <>
      <PostShowModal />
      <Container lg={8}>
        <Row className='justify-content-center'>
          {cards.map(post => {
            return (
              <Col sm={6} lg={4}>
                <PostCard
                id={post.post_id}
                title={post.title}
                imageURL={post.preview_url}
                />
              </Col>
            )
          })}
        </Row>
        
      </Container>
    </>
  );
}

export default Blog;