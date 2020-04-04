import React from 'react';

import PropTypes from 'prop-types';
import { Container } from './styles';

const colors = [
  '#f4effc',
  '#FCF4EE',
  '#EBFBFA',
  '#FFEEF1',
  '#F4F9EF',
  '#FCFCEF',
];

export default function Profile({ children }) {
  const color = colors[Math.floor(Math.random() * colors.length)];

  return <Container color={color}>{children}</Container>;
}

Profile.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};
