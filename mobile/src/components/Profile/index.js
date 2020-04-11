import React from 'react';

import PropTypes from 'prop-types';
import { Container, Text } from './styles';

const colors = [
  '#F4EFFC',
  '#FCF4EE',
  '#EBFBFA',
  '#FFEEF1',
  '#F4F9EF',
  '#FCFCEF',
];

function Profile({
  children,
  width = '68px',
  height = '68px',
  borderRadius = '34px',
  fontSize = '31px',
}) {
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <Container
      color={color}
      width={width}
      height={height}
      borderRadius={borderRadius}>
      <Text fontSize={fontSize} color={color}>
        {children}
      </Text>
    </Container>
  );
}

Profile.propTypes = {
  children: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  borderRadius: PropTypes.string,
  fontSize: PropTypes.string,
};

export default React.memo(Profile);
