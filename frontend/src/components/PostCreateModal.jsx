import React from "react"
import "../styles/PostCreateModal.css"
import PostCreateForm from "./PostCreateForm.jsx"

const PostCreateModal = props => {
    if (!props.show) {
        return null
    }

    return (
        <div className='post-creator' onClick={props.onClose}>
            <div className='post-creator-content' onClick={e => e.stopPropagation()}>
                <div className='post-creator-header'>
                    <button onClick={props.onClose} className='post-creator-close-button'>X</button>
                </div>
                <div className='post-creator-body'>
                    <PostCreateForm />
                </div>
                <div className='post-creator-footer'>
                    Add some buttons here
                </div>
            </div>
        </div>
    )
}

export default PostCreateModal