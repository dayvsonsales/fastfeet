import React from 'react';

import PropTypes from 'prop-types';

import { Status, Container } from './styles';

const status = {
  delivered: { name: 'Entregue', color: '#2ca42b', backgroundColor: '#dff0df' },
  pending: { name: 'Pendente', color: '#C1BC35', backgroundColor: '#F0F0DF' },
  ready: { name: 'Retirada', color: '#4D85EE', backgroundColor: '#BAD2FF' },
  canceled: { name: 'Cancelada', color: '#DE3B3B', backgroundColor: '#FAB0B0' },
};

export default function DeliveryStatus({ type: deliveryStatus }) {
  return (
    <Container>
      <Status
        color={status[deliveryStatus].color}
        backgroundColor={status[deliveryStatus].backgroundColor}
      >
        <div />
        {status[deliveryStatus].name}
      </Status>
    </Container>
  );
}

DeliveryStatus.propTypes = {
  type: PropTypes.string,
};

DeliveryStatus.defaultProps = {
  type: 'delivered',
};
