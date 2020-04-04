import React from 'react';

import PropTypes from 'prop-types';
import { Container, Previous, Next, Wrapper } from './styles';

export default function Paginator({
  total,
  page,
  limit,
  previousIcon,
  nextIcon,
  handlePaginator,
}) {
  if (limit === 0) {
    throw new Error('Limit cannot be zero');
  }

  const activePrevious = page === 1;
  const activeNext = page >= total / limit;

  return (
    <Wrapper>
      <Container>
        <Previous
          type="button"
          disabled={activePrevious}
          onClick={() => handlePaginator(page - 1)}
        >
          {previousIcon || null}
          <span>Anterior</span>
        </Previous>
        <Next
          type="button"
          disabled={activeNext}
          onClick={() => handlePaginator(page + 1)}
        >
          {nextIcon || null}
          <span>Próximo</span>
        </Next>
      </Container>

      <span>
        Página {page} de {Math.ceil(total / limit)}. Total de {total} registros.
      </span>
    </Wrapper>
  );
}

Paginator.propTypes = {
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  handlePaginator: PropTypes.func.isRequired,
  previousIcon: PropTypes.instanceOf(Object),
  nextIcon: PropTypes.instanceOf(Object),
};

Paginator.defaultProps = {
  previousIcon: null,
  nextIcon: null,
};
