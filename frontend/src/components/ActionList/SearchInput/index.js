import React from 'react';

import PropTypes from 'prop-types';

import { MdSearch } from 'react-icons/md';

import { Container, Input } from './styles';

export default function SearchInput({ placeholder }) {
  return (
    <Container>
      <MdSearch color="#999999" size={24} />
      <Input placeholder={placeholder} />
    </Container>
  );
}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
};

SearchInput.defaultProps = {
  placeholder: '',
};
