import React, {useState, useEffect} from 'react';
//import styles from '../styles/CommentsStyles.css';
import '../styles/CommentsStyles.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

const DeleteCommentButton = ({onClick}) => (
    <div className="delete-comment-button" onClick={onClick}>
        <FontAwesomeIcon icon={faTimes}/>
    </div>
);
const Comments = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCommentText, setNewCommentText] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch('http://localhost:3010/comments');
                const data = await response.json();
                setComments(data.result);
                setLoading(false);
            } catch (error) {
                console.error('Помилка при отриманні коментарів:', error);
                setLoading(false);
            }
        };

        fetchComments();
    }, []);

    const handleCommentSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3010/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: newCommentText,
                }),
            });

            const data = await response.json();
            setComments([...comments, data.result]);
            setNewCommentText('');
        } catch (error) {
            console.error('Помилка під час відправлення коментаря:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await fetch(`http://localhost:3010/comments/${commentId}`, {
                method: 'DELETE',
            });

            const updatedComments = comments.filter((comment) => comment.id !== commentId);
            setComments(updatedComments);
        } catch (error) {
            console.error('Помилка при видаленні коментаря:', error);
        }
    };

    return (

        <div className="comments-container">
            <h2 className='comments-heading'>Відгуки</h2>

            <div className='comment-form'>
                <textarea
                    placeholder='Введіть коментар...'
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                />
                <button onClick={handleCommentSubmit}>Надіслати коментар</button>
            </div>

            {loading ? (
                <p className="loading-message">Завантаження коментарів...</p>
            ) : (
                <ul className="comments-list">
                    {comments.map((comment) => (
                        <li key={comment.id} className="comment-item">
                            <p className="comment-text">{comment.text}</p>
                            <p className="comment-date">
                                Опубліковано: {new Date(comment.createdAt).toLocaleString()}
                            </p>
                            <DeleteCommentButton onClick={() => handleDeleteComment(comment.id)}/>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Comments;
