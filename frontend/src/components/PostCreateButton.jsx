import React from 'react'
import { useState, useEffect } from 'react'
import PostCreateModal from "./PostCreateModal.jsx"

const PostCreateButton = ({ role }) => {
    const [showPostCreateModal, setShowPostCreateModal] = useState(false)

    const [isAdmin, setIsAdmin] = useState(false)
    useEffect(() => {
        setIsAdmin(role === 'admin')
    }, [role])
    if (!isAdmin) {
        return null
    }

    return (
        <>
        <button onClick={() => setShowPostCreateModal(true)}>Show post creator</button>
        <PostCreateModal onClose={() => setShowPostCreateModal(false)} show={showPostCreateModal} />
        </>
    )
}

export default PostCreateButton