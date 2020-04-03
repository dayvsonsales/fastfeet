import React, { useState } from 'react';

import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';

import AsyncSelect from 'react-select/async';

import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, FormContainer, Row, Column, Input } from './styles';
import Button from '~/components/Button';
import api from '~/services/api';

export default function Form({ history }) {
  const [recipients, setRecipients] = useState('');
  const [deliverymen, setDeliverymen] = useState('');

  const location = useLocation();
  const { id } = useParams();

  const title =
    location.pathname.indexOf('edit') > -1
      ? 'Edição de encomendas'
      : 'Cadastro de encomendas';

  function handleRecipientChange(input, callback) {
    api.get(`/recipients?q=${input}`).then((response) => {
      const options = response.data.rows.map((recipient) => ({
        value: recipient.id,
        label: recipient.name,
      }));

      callback(options);
    });
  }

  function handleDeliverymanChange(input, callback) {
    api.get(`/deliveryman?q=${input}`).then((response) => {
      const options = response.data.rows.map((deliveryman) => ({
        value: deliveryman.id,
        label: deliveryman.name,
      }));

      callback(options);
    });
  }

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
            <AsyncSelect
              cacheOptions
              loadOptions={(input, callback) =>
                handleRecipientChange(input, callback)
              }
              defaultOptions
              components={{
                IndicatorSeparator: () => null,
              }}
            />
          </Column>

          <Column>
            <label>Entregador</label>
            <AsyncSelect
              cacheOptions
              loadOptions={(input, callback) =>
                handleDeliverymanChange(input, callback)
              }
              defaultOptions
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
