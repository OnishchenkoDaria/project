import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import PostCard from "./PostCard"
import "../styles/PostCreateModal.css"

const PostDisplayBlog = ({posts, isAdmin, handleChange}) => {
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
                  handleChange={handleChange}
                />
              </Col>
            )
          })}
        </Row>
      </Container>
    )
}

export default PostDisplayBlog