import React, { useState, useEffect } from 'react';
import Image from './components/imageList/Image';
import Modal from './components/modal/Modal';
import { fetchRecentImages, fetchSearchImages } from './services/flickrAPI';
import debounce from './utils/debounce';
import './App.css';
import { Box } from '@mui/material';
import Header from './components/header/Header';
import Loader from './components/loader/Loader';
import NoResultFound from './components/noResultFound/NoResultFound';

function MyApp() {

  // State variables
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]); 
  const [page, setPage] = useState(1); 
  const [totalResults, setTotalResults] = useState(0); 
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); 
  const [openModal, setOpenModal] = useState(false); 

  // Fetch recent images on component mount and when the page state changes
  useEffect(() => {
    fetchRecentImages(page, setImages, setTotalResults, setLoading);
  }, [page]);

  // Debounced search function to fetch images based on search query
  const debouncedSearch = debounce(fetchSearchImages, 500);

  // Handle search query input
  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
    setTotalResults(0);

    if (query.trim() !== '') {
      // Fetch images based on search query
      debouncedSearch(query, 1, setImages, setTotalResults, setLoading);
    }
  };

  // Infinite scroll listener to load more images when scrolling to the bottom
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        images.length < totalResults
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [images, totalResults]);

  // Handle image click to open the modal
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenModal(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setSelectedImage(null);
    setOpenModal(false);
  };

  return (
    <div className="App">
      {/* Header component for search input */}
      <Header searchQuery={searchQuery} handleSearch={handleSearch} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          position: 'absolute',
          zIndex: -1,
          top: '20%',
        }}
      >
        {/* Loader component */}
        {loading && <Loader />}

        {/* No result found component */}
        {!loading && images.length === 0 && totalResults === 0 && <NoResultFound />}

        {/* Image list */}
        {images.map((image, index) => (
          <Image key={image.id} image={image} onClick={() => handleImageClick(image)} />
        ))}

        {/* Loading more indicator */}
        {loading && images.length < totalResults && <p>Loading more...</p>}
      </Box>

      {/* Modal component */}
      {selectedImage && (
        <Modal open={openModal} onClose={handleCloseModal} image={selectedImage} />
      )}
    </div>
  );
}

export default MyApp;
