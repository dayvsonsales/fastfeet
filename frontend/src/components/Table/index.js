import React from 'react';

import PropTypes from 'prop-types';
import { Container, Table as T } from './styles';

export default function Table({ children }) {
  return (
    <Container>
      <T>{children}</T>
    </Container>
  );
}

Table.propTypes = {
  children: PropTypes.element.isRequired,
};
