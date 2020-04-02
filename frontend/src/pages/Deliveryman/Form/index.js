import React from 'react';

import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, FormContainer, Row, Column, Input } from './styles';
import Button from '~/components/Button';
import AvatarInput from '~/pages/Deliveryman/Form/AvatarInput';

export default function Form({ history }) {
  const location = useLocation();
  const { id } = useParams();

  const title =
    location.pathname.indexOf('edit') > -1
      ? 'Edição de entregadores'
      : 'Cadastro de entregadores';

  return (
    <Container>
      <header>
        <strong>{title}</strong>
        <div>
          <Button grey type="button" onClick={() => history.goBack()}>
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
          <Column padding="30px 30px 0px 30px">
            <AvatarInput name="avatar_id" />
          </Column>
        </Row>
        <Row>
          <Column>
            <label>Nome</label>
            <Input type="text" placeholder="Seu nome" />
          </Column>
        </Row>
        <Row>
          <Column padding="0 30px 30px 30px">
            <label>Email</label>
            <Input type="text" placeholder="example@rocketseat.com" />
          </Column>
        </Row>
      </FormContainer>
    </Container>
  );
}

Form.propTypes = {
  history: PropTypes.shape().isRequired,
};
