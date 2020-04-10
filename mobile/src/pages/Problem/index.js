import React from 'react';

import {
  Container,
  Background,
  ProblemInput,
  SubmitButton,
  SubmitButtonText,
  ProblemContainer,
} from './styles';

export default function Problem() {
  return (
    <Background>
      <Container>
        <ProblemContainer>
          <ProblemInput placeholder="Inclua aqui o problema que ocorreu na entrega" />
        </ProblemContainer>
        <SubmitButton>
          <SubmitButtonText>Enviar</SubmitButtonText>
        </SubmitButton>
      </Container>
    </Background>
  );
}
