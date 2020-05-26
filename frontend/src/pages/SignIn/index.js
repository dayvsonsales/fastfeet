import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import logo from '../../assets/logo.png';
import { signInRequest } from '../../store/modules/auth/action';
import Input from '~/components/Input';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const formRef = useRef(null);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  async function handleSubmit(data) {
    const { email, password } = data;
    try {
      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      dispatch(signInRequest(email, password));
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      } else {
        toast.error(
          'Não foi possível realizar login, tente novamente mais tarde!'
        );
      }
    }
  }

  return (
    <>
      <img src={logo} alt="Fastfeet" />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <label htmlFor="email">Seu e-mail</label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="exemplo@email.com"
        />
        <label htmlFor="password">Sua senha</label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="***********"
        />

        <button type="submit">
          {loading ? 'Carregando..' : 'Entrar no sistema'}
        </button>
      </Form>
    </>
  );
}
