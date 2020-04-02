import React from 'react';

import PropTypes from 'prop-types';
import { Container } from './styles';

export default function Profile({ children }) {
  return <Container>{children}</Container>;
}

Profile.propTypes = {
  children: PropTypes.element.isRequired,
};
