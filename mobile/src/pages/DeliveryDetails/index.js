import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import {
  Container,
  Background,
  DataContainer,
  Header,
  Title,
  Data,
  DataLabel,
  DataText,
  DataGroup,
  ButtonContainer,
  Button,
  ButtonText,
  VerticalLine,
} from './styles';
import api from '~/services/api';
import { deliveryStatus } from '~/utils/helper';

export default function DeliveryDetails({ route, navigation }) {
  const { id } = route.params;

  const [delivery, setDelivery] = useState(null);

  useEffect(() => {
    async function loadDelivery() {
      const response = await api.get(`delivery?id=${id}`);

      console.tron.log(response);

      if (!response.data.count) {
        Alert.alert('Ocorreu um erro ao buscar delivery');
        return;
      }

      const data = response.data.rows.map((_delivery) => ({
        ..._delivery,
        status: deliveryStatus(_delivery),
        formatted_start_date: _delivery.start_date
          ? format(parseISO(_delivery.start_date), 'dd / MM / yyyy')
          : null,
        formatted_end_date: _delivery.end_date
          ? format(parseISO(_delivery.end_date), 'dd / MM / yyyy')
          : null,
      }));

      setDelivery(data[0]);
    }

    loadDelivery();
  }, []);

  function handleProblem() {
    navigation.navigate('Problem', { id });
  }

  function handleProblemDetails() {
    navigation.navigate('ProblemDetails', { id });
  }

  function handleConfirm() {
    navigation.navigate('Confirm', { id });
  }

  return (
    <Background>
      <Container>
        {delivery && (
          <>
            <DataContainer>
              <Header>
                <Icon name="local-shipping" size={16} color="#7D40E7" />
                <Title>Informações da entrega</Title>
              </Header>
              <Data>
                <DataLabel>DESTINATÁRIO</DataLabel>
                <DataText>{delivery.recipient.name}</DataText>
              </Data>
              <Data>
                <DataLabel>ENDEREÇO DE ENTREGA</DataLabel>
                <DataText>
                  {delivery.recipient.street}, {delivery.recipient.number},{' '}
                  {delivery.recipient.city} - {delivery.recipient.state},{' '}
                  {delivery.recipient.zip_code}
                </DataText>
              </Data>
              <Data>
                <DataLabel>PRODUTO</DataLabel>
                <DataText>{delivery.product}</DataText>
              </Data>
            </DataContainer>

            <DataContainer>
              <Header>
                <Icon name="event" size={16} color="#7D40E7" />
                <Title>Situação da entrega</Title>
              </Header>
              <Data>
                <DataLabel>STATUS</DataLabel>
                <DataText>{delivery.status}</DataText>
              </Data>
              <DataGroup>
                <Data>
                  <DataLabel>DATA DE RETIRADA</DataLabel>
                  <DataText>
                    {delivery.formatted_start_date || '-- / -- /--'}
                  </DataText>
                </Data>
                <Data>
                  <DataLabel>DATA DE ENTREGA</DataLabel>
                  <DataText>
                    {delivery.formatted_end_date || '-- / -- /--'}
                  </DataText>
                </Data>
              </DataGroup>
            </DataContainer>

            <ButtonContainer>
              <Button onPress={handleProblem}>
                <Icon name="highlight-off" color="#E74040" size={24} />
                <ButtonText>Informar Problema</ButtonText>
              </Button>
              <VerticalLine />
              <Button onPress={handleProblemDetails}>
                <Icon name="info-outline" color="#E7BA40" size={24} />
                <ButtonText>Visualizar Problemas</ButtonText>
              </Button>
              <VerticalLine />
              <Button onPress={handleConfirm}>
                <Icon name="alarm-on" color="#7D40E7" size={24} />
                <ButtonText>Confirmar Entrega</ButtonText>
              </Button>
            </ButtonContainer>
          </>
        )}
      </Container>
    </Background>
  );
}
