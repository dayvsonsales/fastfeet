import React, { useEffect, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

import { List } from 'react-content-loader/native';

import { useIsFocused } from '@react-navigation/native';
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
  Wrapper,
} from './styles';
import api from '~/services/api';
import { deliveryStatus } from '~/utils/helper';

export default function DeliveryDetails({ route, navigation }) {
  const deliveryman_id = useSelector((state) => state.user.profile.id);
  const focused = useIsFocused();

  const { id } = route.params;

  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadDelivery() {
    const response = await api.get(`delivery?id=${id}`);

    if (!response.data.count) {
      Alert.alert('Ocorreu um erro ao buscar delivery');
      setLoading(false);
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
    setLoading(false);
  }

  async function startDelivery() {
    try {
      await api.post(`delivery/${id}/start`, {
        deliveryman_id,
      });

      loadDelivery();
      Alert.alert('Sucesso', 'Retirado com sucesso!');
    } catch (e) {
      if (
        e.response.data.error === 'You have reached your delivery daily limit'
      ) {
        Alert.alert('Erro', 'Você atingiu a cota de cinco entregas no dia');
      } else {
        Alert.alert(
          'Erro',
          'Não foi possível retirar encomenda. Verifique se você está dentro do horário estabelecido e tente novamente mais tarde.'
        );
      }
    }
  }

  function handleProblem() {
    if (delivery.end_date || delivery.canceled_at || !delivery.start_date)
      return;

    navigation.navigate('Problem', { id });
  }

  function handleProblemDetails() {
    navigation.navigate('ProblemDetails', { id });
  }

  function handleConfirm() {
    if (delivery.end_date || delivery.canceled_at || !delivery.start_date)
      return;

    navigation.navigate('Confirm', { id });
  }

  function handleStartDelivery() {
    Alert.alert(
      'Atenção',
      `Por favor, confirme se você quer retirar a encomenda número ${id}.`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        { text: 'Retirar encomenda', onPress: () => startDelivery() },
      ],
      { cancelable: true }
    );
  }

  useEffect(() => {
    if (focused) {
      loadDelivery();
    }
  }, [focused]);

  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Wrapper>
        <Container>
          {loading ? (
            <List />
          ) : (
            delivery && (
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
                        {delivery.formatted_start_date || '-- / -- / --'}
                      </DataText>
                    </Data>
                    <Data>
                      <DataLabel>DATA DE ENTREGA</DataLabel>
                      <DataText>
                        {delivery.formatted_end_date || '-- / -- / --'}
                      </DataText>
                    </Data>
                  </DataGroup>
                </DataContainer>

                <ButtonContainer>
                  <Button
                    onPress={handleProblem}
                    disabled={
                      !!(
                        !delivery.start_date ||
                        delivery.end_date ||
                        delivery.canceled_at
                      )
                    }>
                    <Icon
                      name="highlight-off"
                      color={
                        delivery.start_date &&
                        !delivery.end_date &&
                        !delivery.canceled_at
                          ? '#E74040'
                          : 'grey'
                      }
                      size={24}
                    />
                    <ButtonText>Informar Problema</ButtonText>
                  </Button>
                  <VerticalLine />

                  <Button onPress={handleProblemDetails}>
                    <Icon name="info-outline" color="#E7BA40" size={24} />
                    <ButtonText>Visualizar Problemas</ButtonText>
                  </Button>
                  {!delivery.start_date ? (
                    <>
                      <VerticalLine />
                      <Button onPress={handleStartDelivery}>
                        <Icon name="flag" color="#7D40E7" size={24} />
                        <ButtonText>Retirar pacote</ButtonText>
                      </Button>
                    </>
                  ) : (
                    <>
                      <VerticalLine />
                      <Button
                        onPress={handleConfirm}
                        disabled={!!delivery.end_date}>
                        <IconCommunity
                          name="check-circle-outline"
                          color={
                            !delivery.end_date && !delivery.canceled_at
                              ? '#7D40E7'
                              : 'grey'
                          }
                          size={24}
                        />
                        <ButtonText>Confirmar Entrega</ButtonText>
                      </Button>
                    </>
                  )}
                </ButtonContainer>
              </>
            )
          )}
        </Container>
      </Wrapper>
    </Background>
  );
}

DeliveryDetails.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.object,
  }),
  navigation: PropTypes.object,
};
