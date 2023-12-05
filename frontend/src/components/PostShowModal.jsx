import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Ratio from 'react-bootstrap/Ratio'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import 'bootstrap/dist/css/bootstrap.min.css'

const PostShowModal = ({ imageURL, title, content}) => {
  
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" className="bi bi-arrow-right-square-fill" viewBox="0 0 16 16">
          <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1"/>
        </svg>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        size='xl'
        >
        <Modal.Header closeButton />
        <Modal.Body>
            <Row>
                <Col sm={12} md={6}>
                    <Ratio className='h-100'>
                        <Image src={imageURL} fluid style={{ objectFit: 'cover'}}/>
                    </Ratio>
                </Col>
                <Col sm={12} md={6}>
                    <Modal.Title>
                        {title}
                    </Modal.Title>
                    <div className='my-4' style={{height: '50vh'}}>
                        <span>
                            {content}
                        </span>
                    </div>
                    <Modal.Footer>
                    </Modal.Footer>
                </Col>
            </Row>
        </Modal.Body>
        
      </Modal>
    </>
  )
}

export default PostShowModal