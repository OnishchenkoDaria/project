import React from 'react';
import PostCard from '../components/PostCard.jsx'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import postService from '../services/posts.js'
import 'bootstrap/dist/css/bootstrap.min.css'

const cards = await postService.getAll()

const Blog = () => {
  
  return (
    <>
      <Container lg={8}>
        <Row className='justify-content-center'>
          {cards.map(post => {
            return (
              <Col sm={6} lg={4}>
                <PostCard
                  imageURL={post.imageURL}
                  title={post.title}
                  content={post.content}
                  likes={post.likes}
                  views={post.views}
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