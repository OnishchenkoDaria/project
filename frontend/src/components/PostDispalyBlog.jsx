import { useState, useEffect } from 'react' 
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import PostCard from "./PostCard"
import postService from '../services/posts.js'
import registerService from '../services/registerForm'
import "../styles/PostCreateModal.css"

const PostDisplayBlog = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [posts, setPosts] = useState([])

    useEffect(() => {
      const updateData = async () => {
        setIsAdmin(await registerService.getRole() === 'admin')
        setPosts(await postService.getAll())
      }
      updateData()
    }, [])

    const handleDeletePost = (id) => {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    }

    return (
      <Container lg={8}>
        <Row className='justify-content-center'>
          {posts.map((post, index) => {
            return (
              <Col sm={6} lg={4} key={index}>
                <PostCard
                  id={post.id}
                  imageURL={post.imageURL}
                  title={post.title}
                  content={post.content}
                  isAdmin={isAdmin}
                  onDelete={handleDeletePost}
                />
              </Col>
            )
          })}
        </Row>
      </Container>
    )
}

export default PostDisplayBlog