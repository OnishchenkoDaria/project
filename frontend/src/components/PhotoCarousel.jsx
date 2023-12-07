// PhotoCarousel.js
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import Modal from 'react-modal';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {faChevronRight, faChevronLeft, faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';

import '../styles/PhotoCarousel.css';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const StyledButton = styled.button`
  background-color: #abbcdc;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #252b34;
  }
`;
const DeleteButton = ({onClick}) => (
    <div className="delete-button" onClick={onClick}>
        <FontAwesomeIcon icon={faTimes}/>
    </div>
);
const PhotoCarousel = () => {
    const [photos, setPhotos] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3010/photo');
                setPhotos(response.data.result);
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        };

        fetchData();
    }, []);

    const getImageUrl = (imageName) => `http://localhost:3010/photos/${imageName}`;

    const SampleNextArrow = (props) => (
        <div className="custom-arrow custom-next-arrow" onClick={props.onClick}>
            <FontAwesomeIcon icon={faChevronRight}/>
        </div>
    );

    const SamplePrevArrow = (props) => (
        <div className="custom-arrow custom-prev-arrow" onClick={props.onClick}>
            <FontAwesomeIcon icon={faChevronLeft}/>
        </div>
    );

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    const handleUploadImage = async () => {
        try {
            const formData = new FormData();
            formData.append('image', selectedImage);

            await axios.post('http://localhost:3010/photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const response = await axios.get('http://localhost:3010/photo');
            setPhotos(response.data.result);

            setSelectedImage(null);

            setModalIsOpen(false);
        } catch (error) {
            console.error('Error uploading photo:', error);
        }
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0',
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,
    };
    const handleDeleteImage = async (photoId) => {
        try {
            await axios.delete(`http://localhost:3010/photo/${photoId}`);
            const updatedPhotos = photos.filter((photo) => photo.id !== photoId);
            setPhotos(updatedPhotos);
        } catch (error) {
            console.error('Error deleting photo:', error);
        }
    };

    return (
        <div className="photo-carousel-container">
            <h2 className="carousel-title">Фото галерея</h2>

            <div className="button-container">
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Add Image Modal"
                >
                    <div className="image-upload-container">
                        <h2>Додати зображення</h2>
                        <input type="file" onChange={handleFileChange}/>
                        <div className="button-container-add">
                            <button className="upload-button" onClick={handleUploadImage}>Додати</button>
                            <button className="close-button" onClick={closeModal}>Закрити</button>
                        </div>
                    </div>

                </Modal>

                <StyledButton onClick={openModal}>
                    <FontAwesomeIcon icon={faPlus}/> Додати зображення
                </StyledButton>
            </div>

            <Slider {...settings} className="carousel-slider">
                {photos.map((photo) => (
                    <div key={photo.id} className="carousel-slide">
                        <img
                            className="carousel-image"
                            src={getImageUrl(photo.image)}
                            alt={`Photo ${photo.id}`}
                        />
                        <DeleteButton onClick={() => handleDeleteImage(photo.id)}/>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default PhotoCarousel;
