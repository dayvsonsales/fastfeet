import React, { useState } from 'react';

import { Alert, StatusBar } from 'react-native';
import PropTypes from 'prop-types';

import {
  Container,
  Background,
  ProblemInput,
  SubmitButton,
  SubmitButtonText,
  ProblemContainer,
} from './styles';

import api from '~/services/api';

export default function Problem({ route }) {
  const { id } = route.params;
  const [description, setDescription] = useState('');

  async function handleSubmit() {
    try {
      if (!description) {
        Alert.alert('Erro', 'Necessário informar uma descrição');
        return;
      }

      await api.post(`delivery/${id}/problems`, {
        description,
      });

      setDescription('');

      Alert.alert('Sucesso!', 'Problema cadastrado com sucesso!');
    } catch (_) {
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao cadastrar o problema. Tente novamente mais tarde.'
      );
    }
  }

  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Container>
        <ProblemContainer>
          <ProblemInput
            maxLength={255}
            onChangeText={(text) => setDescription(text)}
            value={description}
            placeholder="Inclua aqui o problema que ocorreu na entrega"
          />
        </ProblemContainer>
        <SubmitButton onPress={handleSubmit}>
          <SubmitButtonText>Enviar</SubmitButtonText>
        </SubmitButton>
      </Container>
    </Background>
  );
}

Problem.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.object,
  }),
};
