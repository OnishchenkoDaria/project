import Card from 'react-bootstrap/Card'
import Ratio from 'react-bootstrap/Ratio'
import PostShowModal from './PostShowModal';
import 'bootstrap/dist/css/bootstrap.min.css'
import CardFooter from 'react-bootstrap/esm/CardFooter';
const PostCard = ({ imageURL, title, content}) => {
  return (
    <Card className='bg-dark text-white mt-4 lg-4 sm-6' style={{height: '200px'}}>
      <Ratio className='h-100'>
          <Card.Img src={imageURL} style={{ objectFit: 'cover'}}/>
      </Ratio>
      <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value for darkness
          }}
      />
      <Card.ImgOverlay>
          <Card.Body style={{height: '110px'}}>
            <h3>{title}</h3>
          </Card.Body>
          <CardFooter>
            <PostShowModal
              imageURL={imageURL}
              title={title}
              content={content}
            />
          </CardFooter>
      </Card.ImgOverlay>
    </Card>
    );
  };

export default PostCard