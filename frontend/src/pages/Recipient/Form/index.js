import React, { useRef, useEffect, useState } from 'react';

import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form as FormContainer } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Container, Row, Column } from './styles';
import MaskInput from '~/components/MaskInput';
import Button from '~/components/Button';
import Input from '~/components/Input';
import api from '~/services/api';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  street: Yup.string().required('A rua é obrigatória'),
  number: Yup.number().typeError('Número apenas').required('Campo obrigatório'),
  address_line: Yup.string().required('Campo obrigatório'),
  city: Yup.string().required('Cidade é obrigatória'),
  state: Yup.string().required('Estado é obrigatório'),
  zip_code: Yup.string().required('CEP é obrigatório'),
});

export default function Form({ history }) {
  const [recipient, setRecipient] = useState();
  const location = useLocation();
  const { id } = useParams();

  const formRef = useRef(null);

  const title =
    location.pathname.indexOf('edit') > -1
      ? 'Edição de destinatários'
      : 'Cadastro de destinatários';

  async function handleSubmit(data, { reset }) {
    try {
      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      if (!id) {
        await api.post('recipients', data);

        reset();
      } else {
        await api.put(`recipients/${id}`, data);
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

  useEffect(() => {
    async function loadRecipient() {
      try {
        const response = await api.get(`recipients?id=${id}`);
        const data = response.data.rows[0];

        formRef.current.setFieldValue('zip_code', data.zip_code);

        setRecipient(data);
      } catch (e) {
        toast.error('Entregador não encontrado');
      }
    }

    if (id) {
      loadRecipient();
    }
  }, [id]);

  return (
    <Container>
      <FormContainer
        initialData={recipient}
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
            <Column>
              <label>Nome</label>
              <Input
                name="name"
                type="text"
                placeholder="Digite o nome do destinatário"
              />
            </Column>
          </Row>
          <Row>
            <Column width="60%">
              <label>Rua</label>
              <Input
                name="street"
                type="text"
                placeholder="Digite o nome do destinatário"
              />
            </Column>
            <Column width="20%">
              <label>Número</label>
              <Input name="number" type="text" placeholder="Número" />
            </Column>
            <Column width="20%">
              <label>Complemento</label>
              <Input
                name="address_line"
                type="text"
                placeholder="Complemento"
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <label>Cidade</label>
              <Input
                name="city"
                type="text"
                placeholder="Digite o nome da cidade"
              />
            </Column>
            <Column>
              <label>Estado</label>
              <Input name="state" type="text" placeholder="Digite o estado" />
            </Column>
            <Column>
              <label>CEP</label>
              <MaskInput
                name="zip_code"
                type="text"
                placeholder="00000-000"
                mask="99999-999"
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
