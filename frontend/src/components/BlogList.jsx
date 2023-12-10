import React, {useState, useEffect} from 'react';
import "../styles/BlogList.css"
import Modal from "react-modal";
import axios from "axios";

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        text: '',
        image: null,
    });
    const fetchBlogs = async () => {
        try {
            const response = await fetch('http://localhost:3010/blogs');
            const data = await response.json();

            const blogsWithImages = await Promise.all(
                data.result.map(async (blog) => {
                    const imageResponse = await fetch(`http://localhost:3010/${blog.image}`);
                    const imageData = await imageResponse.blob();
                    const imageUrl = URL.createObjectURL(imageData);
                    return {...blog, imageUrl};
                })
            );

            setBlogs(blogsWithImages);
        } catch (error) {
            console.error('Помилка при отриманні блогів:', error);
        }
    };

    useEffect(() => {


        fetchBlogs();
    }, []);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setFormData({...formData, image: imageFile});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('text', formData.text);
        formDataToSend.append('image', formData.image);

        try {
            const response = await axios.post('http://localhost:3010/blogs', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response) {
                fetchBlogs();
                closeModal();
            } else {
                console.error('Помилка при створенні блога');
            }
        } catch (error) {
            console.error('Помилка при відправці запиту:', error);
        }
    };

    const handleDelete = async (blogId) => {
        try {
            const response = await axios.delete(`http://localhost:3010/blogs/${blogId}`);

            if (response) {
                fetchBlogs();
            } else {
                console.error('Помилка при видаленні блога');
            }
        } catch (error) {
            console.error('Помилка при відправці запиту для видалення:', error);
        }
    };

    return (
        <div className="blog-list-container">
            <h1 className="blog-list-title">Список блогів</h1>
            <button onClick={openModal} className="button-primary">
                Додати блог
            </button>
            {blogs.length > 0 ? (
                <ul className="blog-ul">
                    {blogs.map((blog) => (
                        <li key={blog.id} className="blog-item">
                            <div
                                className="delete-icon"
                                onClick={() => handleDelete(blog.id)}
                            > &#10006; </div>
                            <h2 className="blog-title">{blog.title}</h2>
                            <p className="blog-description">{blog.description}</p>
                            <p className="blog-text">{blog.text}</p>
                            <img
                                src={blog.imageUrl}
                                alt={blog.title}
                                className="blog-image"
                                style={{maxWidth: '100%'}}
                            />
                            <p className="blog-date">Дата створення: {new Date(blog.createdAt).toLocaleString()}</p>

                        </li>
                    ))}
                </ul>
            ) : (
                <p className="loading-message">Завантаження блогів...</p>
            )}
            <Modal
                isOpen={isModalOpen}
                appElement={document.getElementById('root')}
                onRequestClose={closeModal}
                contentLabel="Додати блог"
            >
                <h2 className="modal">Додати блог</h2>
                <form onSubmit={handleSubmit} className="modal">
                    <label className="label">
                        Заголовок:
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="input"
                        />
                    </label>
                    <label className="label">
                        Опис:
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="input"
                        />
                    </label>
                    <label className="label">
                        Текст:
                        <textarea
                            name="text"
                            value={formData.text}
                            onChange={handleInputChange}
                            className="input"
                        />
                    </label>
                    <label className="label">
                        Зображення:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="input"
                        />
                    </label>
                    <button type="submit" className="button">
                        Додати блог
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default BlogList;
