import React from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import PostCreateModal from "./PostCreateModal.jsx"
import 'bootstrap/dist/css/bootstrap.min.css'

const PostCreateButton = ({ isAdmin }) => {
    const [showPostCreateModal, setShowPostCreateModal] = useState(false)
    if (!isAdmin) {
        return null
    }

    return (
        <>
        <Button onClick={() => setShowPostCreateModal(true)}>Post</Button>
        <PostCreateModal onClose={() => setShowPostCreateModal(false)} show={showPostCreateModal} />
        </>
    )
}

export default PostCreateButton