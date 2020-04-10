import React from 'react';

import { RNCamera } from 'react-native-camera';
import {
  Container,
  Background,
  CameraContainer,
  SubmitButton,
  SubmitText,
} from './styles';

export default function DeliveryConfirm() {
  return (
    <Background>
      <Container>
        <CameraContainer>
          <RNCamera />
        </CameraContainer>
        <SubmitButton>
          <SubmitText>Enviar</SubmitText>
        </SubmitButton>
      </Container>
    </Background>
  );
}
