import React, { useRef, useState } from 'react';
import { StatusBar, Image, Alert } from 'react-native';

import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Background,
  CameraContainer,
  SubmitButton,
  SubmitText,
  Camera,
  TakeButtonContainer,
} from './styles';

import api from '~/services/api';

export default function DeliveryConfirm({ route, navigation }) {
  const deliveryman_id = useSelector((state) => state.user.profile.id);

  const { id } = route.params;

  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState();

  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);

      setPhoto(data);
    }
  };

  async function handleSubmit() {
    if (!photo) {
      Alert.alert('Erro', 'Necessário ter uma imagem como comprovante!');
      return;
    }

    try {
      const dataForm = new FormData();

      dataForm.append('file', {
        uri: photo.uri,
        type: 'image/jpeg',
        name: '1.jpg',
      });

      const response = await api.post('files', dataForm);
      const { id: signature_id } = response.data;

      await api.post(`/delivery/${id}/finish`, {
        signature_id,
        deliveryman_id,
      });

      Alert.alert('Sucesso', 'Entrega confirmada com sucesso!');
      navigation.goBack();
    } catch (e) {
      console.tron.log(e);
      Alert.alert('Ocorreu um problema no upload do arquivo');
    }
  }

  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Container>
        <CameraContainer>
          {!photo ? (
            <>
              <Camera ref={cameraRef} type="back" flashMode="auto" />
              <TakeButtonContainer onPress={takePicture}>
                <Icon name="camera-alt" size={36} color="#FFFFFF" />
              </TakeButtonContainer>
            </>
          ) : (
            <>
              <Image
                source={{ uri: `data:image/png;base64,${photo.base64}` }}
                style={{ width: '100%', height: '100%' }}
              />
              <TakeButtonContainer onPress={() => setPhoto(null)}>
                <Icon name="delete-forever" size={36} color="#FFFFFF" />
              </TakeButtonContainer>
            </>
          )}
        </CameraContainer>
        <SubmitButton onPress={handleSubmit}>
          <SubmitText>Enviar</SubmitText>
        </SubmitButton>
      </Container>
    </Background>
  );
}

DeliveryConfirm.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.object,
  }),
  navigation: PropTypes.object,
};
