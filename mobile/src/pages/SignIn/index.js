import React, { useRef, useState } from 'react';
import { Image, View, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png';

import { Container, Form, FormInput, SubmitButton } from './styles';
import { signInRequest } from '~/store/modules/auth/action';

export default function SignIn() {
  const [userId, setUserId] = useState(null);
  const userIdRef = useRef();

  const loading = useSelector((state) => state.auth.loading);

  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch(signInRequest(userId));
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#7D40E7' }}>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            ref={userIdRef}
            secureTextEntry
            onChangeText={setUserId}
            placeholder="Informe seu ID de cadastro"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Entrar no sistema
          </SubmitButton>
        </Form>
      </Container>
    </View>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.object,
};
