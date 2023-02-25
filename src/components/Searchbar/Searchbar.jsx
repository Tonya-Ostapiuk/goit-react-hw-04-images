import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaAngellist } from 'react-icons/fa';

import {
  SearchbarStyled,
  SearchFormStyled,
  SearchFormBtnStyled,
  SearchFormInputStyled,
} from './Searchbar.styled';

export function Searchbar({onSubmit}) {
  const [image, setImage] = useState('');
  
  const handleChange = evt => {
    setImage( evt.target.value.toLowerCase() );
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (image.trim() === '') {
      return toast.warn('Enter your request');
    }
    onSubmit(image);
    setImage( '' );
  };



  return (
    <SearchbarStyled>
      <SearchFormStyled onSubmit={handleSubmit}>
        <SearchFormBtnStyled type="submit">
          <FaAngellist color="white" size="20px" />
        </SearchFormBtnStyled>

        <SearchFormInputStyled
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={image}
          onChange={handleChange}
        />
      </SearchFormStyled>
    </SearchbarStyled>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
