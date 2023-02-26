import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { OverlayStyled, ModalStyled } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, children }) {

useEffect(() => {
  window.addEventListener('keydown', onCloseModal);

  return () => {
    window.removeEventListener('keydown', onCloseModal);
  }
})


  const onCloseModal = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  const onCloseModalOnBackdrop = evt => {
    if (evt.targat === evt.currentTerget) {
      onClose();
    }
  };

  return createPortal(
    <OverlayStyled onClick={onCloseModalOnBackdrop}>
      <ModalStyled>{children}</ModalStyled>
    </OverlayStyled>,
    modalRoot
  );
};

Modal.propTypes = {
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
};
