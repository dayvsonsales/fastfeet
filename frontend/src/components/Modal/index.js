import React, { forwardRef, useEffect } from 'react';

import PropTypes from 'prop-types';

import { Container, ModalContainer } from './styles';

const Modal = forwardRef(({ children, show, onClickOutside }, ref) => {
  useEffect(() => {
    function _handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    }

    document.addEventListener('mousedown', _handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', _handleClickOutside);
    };
  }, [ref, onClickOutside]);

  return (
    <Container show={show}>
      <ModalContainer ref={ref}>{children}</ModalContainer>
    </Container>
  );
});

Modal.propTypes = {
  children: PropTypes.element,
  show: PropTypes.bool.isRequired,
  onClickOutside: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  children: '',
};

export default Modal;
