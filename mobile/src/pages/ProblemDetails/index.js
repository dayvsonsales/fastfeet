import React from 'react';

import {
  Container,
  Background,
  ItemContainer,
  Header,
  Title,
  Problem,
  ProblemText,
  ProblemDate,
} from './styles';

export default function ProblemDetails() {
  return (
    <Background>
      <Container>
        <ItemContainer>
          <Header>
            <Title>Encomenda 01</Title>
          </Header>
          <Problem>
            <ProblemText>Destinatário ausente</ProblemText>
            <ProblemDate>14/01/2020</ProblemDate>
          </Problem>
          <Problem>
            <ProblemText>Destinatário ausente</ProblemText>
            <ProblemDate>14/01/2020</ProblemDate>
          </Problem>
        </ItemContainer>
      </Container>
    </Background>
  );
}
