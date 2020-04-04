import React, { useRef, useEffect, useState } from 'react';

import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form as FormContainer } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Container, Row, Column } from './styles';
import Button from '~/components/Button';
import AvatarInput from '~/pages/Deliveryman/Form/AvatarInput';
import api from '~/services/api';

import Input from '~/components/Input';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Necessário ser um e-mail válido')
    .required('E-mail é obrigatório'),
});

export default function Form({ history }) {
  const [deliveryman, setDeliveryman] = useState();

  const location = useLocation();
  const { id } = useParams();

  const formRef = useRef(null);

  const title =
    location.pathname.indexOf('edit') > -1
      ? 'Edição de entregadores'
      : 'Cadastro de entregadores';

  async function handleSubmit(data, { reset }) {
    try {
      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      if (!id) {
        await api.post('deliveryman', data);

        reset();
      } else {
        await api.put(`deliveryman/${id}`, data);
      }

      toast.success('Salvo com sucesso!');
    } catch (err) {
      console.tron.log(err);
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      } else {
        toast.error('Não foi possível salvar entregador');
      }
    }
  }

  async function loadDeliveryman() {
    try {
      const response = await api.get(`deliveryman?id=${id}`);

      setDeliveryman(response.data.rows[0]);
    } catch (e) {
      toast.error('Entregador não encontrado');
    }
  }

  useEffect(() => {
    if (id) {
      loadDeliveryman();
    }
  }, [id]);

  return (
    <Container>
      <FormContainer
        initialData={deliveryman}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <header>
          <strong>{title}</strong>
          <div>
            <Button grey type="button" onClick={() => history.goBack()}>
              <MdKeyboardArrowLeft size={24} color="#fff" />
              <span>Voltar</span>
            </Button>
            <Button type="submit">
              <MdDone size={24} color="#fff" />
              <span>Salvar</span>
            </Button>
          </div>
        </header>
        <section>
          <Row>
            <Column padding="30px 30px 0px 30px">
              <AvatarInput name="avatar_id" />
            </Column>
          </Row>
          <Row>
            <Column>
              <label>Nome</label>
              <Input name="name" type="text" placeholder="Seu nome" />
            </Column>
          </Row>
          <Row>
            <Column padding="0 30px 30px 30px">
              <label>Email</label>
              <Input
                name="email"
                type="text"
                placeholder="example@rocketseat.com"
              />
            </Column>
          </Row>
        </section>
      </FormContainer>
    </Container>
  );
}

Form.propTypes = {
  history: PropTypes.shape().isRequired,
};
