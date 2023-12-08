import { useState } from 'react';
import { format } from 'fecha'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import postService from '../services/posts.js'


const PostCreate = ({ isAdmin, handleAddition }) => {
  const [show, setShow] = useState(false);
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    date: '',
    image: null,
  })
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (!isAdmin) {
    return null
  }

  const handleInputChange = (event) => {
    //console.log([event.target.name], event.target.value)
    setPostData({
      ...postData,
      [event.target.name]: event.target.value
    })
  }

  const handleImageChange = (event) => {
    setPostData({
      ...postData,
      image: event.target.files[0]
    })
    setButtonIsDisabled(false)
  }

  const handleSubmit = (event) => {
    //console.log(event)
    // Preventing page reloading
    event.preventDefault()

    // Creating object
    // TODO: ADD preview_url
    const post = new FormData()
    post.append('title', postData.title)
    post.append('content', postData.content)
    post.append('date', format(new Date(), 'YYYY-MM-DD'))
    post.append('image', postData.image)

    console.log(post)

    // Sending object to the server
    const sendPost = async () => {
      await postService.create(post)
      handleAddition()
    }
    sendPost()
    
    // Clearing up
    setPostData({
      title: '',
      content: '',
      date: '',
      image: null,
    })

    handleClose()
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} encType='multipart/form-data'>
            <Form.Group className='mb-3' controlId='PostCreate.ControlInputl'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                name='title'
                type='text'
                placeholder='Title'
                value={postData.title}
                onChange={handleInputChange}
                maxLength={50} 
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className='mb-3'
              controlId="PostCreate.ControlTextarea1"
            >
              <Form.Label>Write your post:</Form.Label>
              <Form.Control as="textarea" rows={3} 
                name='content'
                placeholder={`What's on your mind?`}
                value={postData.content}
                onChange={handleInputChange}
                maxLength={1000}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control type="file" accept='image/*' name='image'onChange={handleImageChange}/>
              <Button variant="primary" type='submit' className='mt-3' disabled={buttonIsDisabled}>
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PostCreate;