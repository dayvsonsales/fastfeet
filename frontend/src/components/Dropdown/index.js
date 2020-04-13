import React, { useEffect, useRef, useState } from 'react';

import { MdMoreHoriz } from 'react-icons/md';

import PropTypes from 'prop-types';

import { Dropdown as Container, DropdownContent } from './styles';

export default function Dropdown({ children }) {
  const ref = useRef(null);
  const [opened, setOpened] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    function _handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpened(false);
        setCount(1);
      }
    }

    document.addEventListener('mousedown', _handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', _handleClickOutside);
    };
  }, [ref]);

  function handleClick(event) {
    if (ref.current.children[0].contains(event.target)) {
      setCount(count + 1);
      if (count < 2) {
        setOpened(true);
      } else {
        setOpened(false);
        setCount(1);
      }
    }
  }

  return (
    <Container ref={ref} onClick={handleClick} opened={opened}>
      <MdMoreHoriz size={24} color="#C6C6C6" />
      <DropdownContent>{children}</DropdownContent>
    </Container>
  );
}

Dropdown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Object),
    PropTypes.instanceOf(String),
    PropTypes.instanceOf(Array),
  ]).isRequired,
};
