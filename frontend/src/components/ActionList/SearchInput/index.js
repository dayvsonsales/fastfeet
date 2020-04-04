import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { MdSearch } from 'react-icons/md';

import { Container, Input } from './styles';

export default function SearchInput({ placeholder, onChange, onEnter }) {
  const [value, setValue] = useState('');

  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 13 || e.key === 'Enter') {
      e.preventDefault();
      if (onEnter) {
        onEnter(e.target.value);
      }
    }
  });

  return (
    <Container>
      <MdSearch color="#999999" size={24} />
      <Input
        value={value}
        onChange={onChange || ((e) => setValue(e.target.value))}
        placeholder={placeholder}
      />
    </Container>
  );
}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
};

SearchInput.defaultProps = {
  placeholder: '',
  onChange: null,
  onEnter: null,
};
