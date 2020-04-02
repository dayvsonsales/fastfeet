import React from 'react';

import PropTypes from 'prop-types';
import { Container } from './styles';

export default function ActionList({ children }) {
  return <Container>{children}</Container>;
}

ActionList.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
};
