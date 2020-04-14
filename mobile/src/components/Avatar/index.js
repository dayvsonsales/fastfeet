import React from 'react';
import { Image } from 'react-native';

import PropTypes from 'prop-types';

function Avatar({ url, ...rest }) {
  return <Image source={{ uri: url }} {...rest} />;
}

Avatar.propTypes = {
  url: PropTypes.string,
};

export default React.memo(Avatar);
