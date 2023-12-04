import Card from 'react-bootstrap/Card'
import Ratio from 'react-bootstrap/Ratio'
import 'bootstrap/dist/css/bootstrap.min.css'

const PostCard = ({ id, title, imageURL }) => {
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
          <Card.Body className='h-100'>
              <Card.Title as='h3'>{title}</Card.Title>
              <Card.Link href={`http://localhost:5173/blog/${id}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" className="bi bi-arrow-right-square-fill" viewBox="0 0 16 16">
                  <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1"/>
                </svg>
              </Card.Link>
          </Card.Body>
          
      </Card.ImgOverlay>
  </Card>
    );
  };

export default PostCard