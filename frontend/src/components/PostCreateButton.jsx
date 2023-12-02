import React from 'react'
import { useState } from 'react'
import PostCreateModal from "./PostCreateModal.jsx"

const PostCreateButton = () => {
    const [showPostCreateModal, setShowPostCreateModal] = useState(false)    

    return (
        <>
        <button onClick={() => setShowPostCreateModal(true)}>Show post creator</button>
        <PostCreateModal onClose={() => setShowPostCreateModal(false)} show={showPostCreateModal} />
        </>
    )
}

export default PostCreateButton