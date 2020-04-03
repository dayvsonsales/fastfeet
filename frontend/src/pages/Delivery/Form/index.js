import React, { useState, useEffect, useRef } from 'react';

import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';

import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form as FormContainer } from '@unform/web';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import AsyncSelect from '~/components/AsyncSelect';
import { Container, Row, Column } from './styles';
import Button from '~/components/Button';
import Input from '~/components/Input';

import api from '~/services/api';

const schema = Yup.object().shape({
  product: Yup.string().required('O nome é obrigatório'),
  recipient_id: Yup.number('Selecione um destinatário válido')
    .typeError('Selecione um destinatário válido')
    .required('O destinatário é obrigatório'),
  deliveryman_id: Yup.number('Selecione um entregador válido')
    .typeError('Selecione um destinatário válido')
    .required('O entregador é obrigatório'),
});

export default function Form({ history }) {
  const [delivery, setDelivery] = useState();

  const formRef = useRef(null);

  const location = useLocation();
  const { id } = useParams();

  const title =
    location.pathname.indexOf('edit') > -1
      ? 'Edição de encomendas'
      : 'Cadastro de encomendas';

  function handleRecipientChange(input, callback) {
    api.get(`/recipients?q=${input}`).then((response) => {
      const options = response.data.rows.map((_recipient) => ({
        value: _recipient.id,
        label: _recipient.name,
      }));

      callback(options);
    });
  }

  function handleDeliverymanChange(input, callback) {
    api.get(`/deliveryman?q=${input}`).then((response) => {
      const options = response.data.rows.map((_deliveryman) => ({
        value: _deliveryman.id,
        label: _deliveryman.name,
      }));

      callback(options);
    });
  }

  async function handleSubmit(data, { reset }) {
    try {
      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      if (!id) {
        await api.post('delivery', data);

        reset();
        setDelivery(data);
      } else {
        await api.put(`delivery/${id}`, data);
      }

      toast.success('Salvo com sucesso!');
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      } else {
        toast.error('Não foi possível salvar encomenda');
      }
    }
  }

  async function loadDelivery() {
    try {
      const response = await api.get(`delivery?id=${id}`);

      const data = response.data.rows.map((_delivery) => ({
        ..._delivery,
        deliveryman_id: {
          label: _delivery.deliveryman.name,
          value: _delivery.deliveryman.id,
        },
        recipient_id: {
          label: _delivery.recipient.name,
          value: _delivery.recipient.id,
        },
      }));

      formRef.current.setFieldValue('deliveryman_id', data[0].deliveryman_id);
      formRef.current.setFieldValue('recipient_id', data[0].recipient_id);
      setDelivery(data[0]);
    } catch (e) {
      toast.error('Delivery não encontrado');
    }
  }

  useEffect(() => {
    if (id) {
      loadDelivery();
    }
  }, [id]);

  return (
    <Container>
      <FormContainer
        initialData={delivery}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <header>
          <strong>{title}</strong>
          <div>
            <Button grey={1} type="button" onClick={() => history.goBack()}>
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
              <label>Destinatário</label>
              <AsyncSelect
                name="recipient_id"
                cacheOptions
                loadOptions={handleRecipientChange}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </Column>

            <Column>
              <label>Entregador</label>
              <AsyncSelect
                name="deliveryman_id"
                cacheOptions
                loadOptions={(input, callback) =>
                  handleDeliverymanChange(input, callback)
                }
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </Column>
          </Row>
          <Row>
            <Column padding="0 30px 30px 30px">
              <label>Nome do produto</label>
              <Input
                type="text"
                name="product"
                placeholder="Digite o nome do produto"
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
