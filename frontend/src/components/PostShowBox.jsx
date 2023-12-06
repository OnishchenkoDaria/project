import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Ratio from 'react-bootstrap/Ratio'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PostShowModal from './PostShowModal';
import postService from '../services/posts.js'
import "bootstrap/dist/css/bootstrap.min.css"

const cards = await postService.getAll()

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

const PostDisplay = ({ imageURL, title, content }) => {
    return (
      <Container className='my-4'>
        <Row className=''>
          <Col sm={12} md ={4}>
            <Post 
              imageURL={cards[0].imageURL}
              title={cards[0].title}
              content={cards[0].content}
              />
          </Col>
          <Col sm={12} md ={4}>
            <Post
              imageURL={cards[1].imageURL}
              title={cards[1].title}
              content={cards[1].content} 
              />
          </Col>
          <Col sm={12} md ={4}>
            <Post 
              imageURL={cards[2].imageURL}
              title={cards[2].title}
              content={cards[2].content} 
              />
          </Col>
        </Row>  
      </Container>
    );
}

export default PostDisplay