import { useState } from 'react'
import { format } from 'fecha' // Formatting date to SQL format
import postService from '../services/posts.js'
import '../styles/PostForm.css'

const PostCreateForm = () => {
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    date: '',
    image: null,
  })

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
    //console.log(postData)
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
    postService
    .create(post)
    
    // Clearing up
    setPostData({
      title: '',
      content: '',
      date: '',
      image: null,
    })
  }

  return (
    <div className='post-form'>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>
              Title:
              <input
                className='post-form-title' 
                name='title' 
                type='text'
                value={postData.title}
                onChange={handleInputChange}
                maxLength={50} 
              />
          </label>
        </div>
        {/* Creating a post area.*/}
        <label> {/* Covering textarea with a lable, so it can be selected, when clicking on label */}
          Write your post:
          <div>
            <textarea
              name='content'
              placeholder={`What's on your mind?`}
              value={postData.content}
              onChange={handleInputChange}
              maxLength={1000}
            />
            </div>
        </label>
        <button className='post-form-submit' type='submit'>Post</button>
        <input className='post-form-add-image' type='file' accept='image/*' name='image'onChange={handleImageChange} />
      </form>
    </div>
  )
}

export default PostCreateForm
