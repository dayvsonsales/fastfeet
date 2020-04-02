import React from 'react';

import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import Select from 'react-select';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, FormContainer, Row, Column, Input } from './styles';
import Button from '~/components/Button';

import ActionList from '~/components/ActionList';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export default function Form({ history }) {
  const location = useLocation();
  const { id } = useParams();

  const title =
    location.pathname.indexOf('edit') > -1
      ? 'Edição de encomendas'
      : 'Cadastro de encomendas';

  return (
    <Container>
      <header>
        <strong>{title}</strong>
        <div>
          <Button grey={1} type="button" onClick={() => history.goBack()}>
            <MdKeyboardArrowLeft size={24} color="#fff" />
            <span>Voltar</span>
          </Button>
          <Button type="button">
            <MdDone size={24} color="#fff" />
            <span>Salvar</span>
          </Button>
        </div>
      </header>

      <FormContainer>
        <Row>
          <Column>
            <label>Destinatário</label>
            <Select
              id="recipient"
              options={options}
              components={{
                IndicatorSeparator: () => null,
              }}
            />
          </Column>

          <Column>
            <label>Entregador</label>
            <Select
              id="deliveryman"
              options={options}
              components={{
                IndicatorSeparator: () => null,
              }}
            />
          </Column>
        </Row>
        <Row>
          <Column padding="0 30px 30px 30px">
            <label>Nome do produto</label>
            <Input type="text" placeholder="Digite o nome do produto" />
          </Column>
        </Row>
      </FormContainer>
    </Container>
  );
}

Form.propTypes = {
  history: PropTypes.shape().isRequired,
};
