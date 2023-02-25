import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spiner } from './Loader/Loader';

import fetchImages from '../Servises/imgApi';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { AppStyled } from './App.Styled';

export function App() {
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [tags, setTags] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (query.trim() === '') {
        return;
      }

      setIsLoading(true);

      try {
  
        const response = await fetchImages(query, page);

        setImages(prevImages => [...prevImages, ...response.hits]);
        setTotalHits(response.totalHits);

        if (page === 1 && response.totalHits !== 0) {
          toast.success(`Hooray! We found ${response.totalHits} images.`);
        }

        if (response.hits.length === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [query, page, error, totalHits]);


  const showImage = value => {
    if (value.trim() === '') {
      return toast.warn('Enter your request');
    }
    setImages([]);
    setPage(1);
    setQuery(value);
  };

  const onClickLoad = () => {
    setPage(page => page + 1);
  };

  const toggleModal = (largeImageURL, tags) => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  return (
    <AppStyled>
      <Searchbar onSubmit={showImage} />
      {isLoading && <Spiner />}

      <ImageGallery images={images} onClick={toggleModal} />

      {images.length !== 0 && <Button handleClick={onClickLoad} />}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        closeOnClick
        theme="light"
      />
    </AppStyled>
  );
}

