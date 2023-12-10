import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Ratio from 'react-bootstrap/Ratio'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PostShowModal from './PostShowModal';
import "bootstrap/dist/css/bootstrap.min.css"

const Post = ({ imageURL, title, content }) => {
    return (
      <Card className='rounded my-3'>
        <Ratio aspectRatio='4x3' className='h-100'>
          <Card.Img src={imageURL} style={{ objectFit: 'cover'}}/>
        </Ratio>
        <Card.Body style={{height: '110px'}}>
          <h5>{title}</h5>
        </Card.Body>
        <PostShowModal
              imageURL={imageURL}
              title={title}
              content={content}
        />
      </Card>
    );
}

const PostDisplayMain = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <div style={{marginTop: '40px', textAlign: 'center'}}>No posts yet</div>
  }
    return (
      <Container className='my-4'>
        <Row className=''>
          {posts.slice(0, 3).map((post, index) => (
            <Col sm={12} md={4} key={index}>
              {post ? (
                <Post 
                  imageURL={post.imageURL}
                  title={post.title}
                  content={post.content} 
                />
              ) : (
                <div>Invalid post data</div>
              )}
            </Col>
          ))}
        </Row>  
      </Container>
    );
}

export default PostDisplayMain