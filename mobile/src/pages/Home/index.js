import React, { useEffect, useState } from 'react';
import { withNavigationFocus } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import Background from '~/components/Background';

import {
  Container,
  ProfileContainer,
  List,
  Slug,
  WelcomeContainer,
  Welcome,
  Name,
  Salute,
  DeliveryContainer,
  Title,
  HeaderContainer,
  ChooseButton,
  ChooseButtonText,
  ChooseButtonContainer,
  ListContainer,
  ItemContainer,
  HeaderItemContainer,
  HeaderItemText,
  TimelineContainer,
  Time,
  Ball,
  TimeText,
  HeaderFooterContainer,
  InformationContainer,
  DateLabelText,
  DateText,
  Details,
  DetailsText,
  HorizontalLine,
  BallContainer,
  InvisibleHorizontalLine,
} from './styles';

import api from '~/services/api';

function Home({ isFocused }) {
  const [appointments, setAppointments] = useState([]);
  const user = useSelector((state) => state.user.profile);

  const choosedPending = true;

  async function loadAppointments() {
    // const response = await api.get('/appointments');
    // setAppointments(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      // loadAppointments();
    }
  }, [isFocused]);

  async function handleCancel(id) {}

  return (
    <Background>
      <Container>
        <ProfileContainer>
          <WelcomeContainer>
            {user.avatar ? (
              <Image
                style={{ width: 68, height: 68, borderRadius: 34 }}
                source={{ uri: user.avatar.url }}
              />
            ) : (
              <Slug>{user.slug}</Slug>
            )}
            <Salute>
              <Welcome>Bem vindo de volta,</Welcome>
              <Name>{user.name}</Name>
            </Salute>
          </WelcomeContainer>
          <Icon name="exit-to-app" color="#E74040" size={24} />
        </ProfileContainer>

        <DeliveryContainer>
          <HeaderContainer>
            <Title>Entregas</Title>
            <ChooseButtonContainer>
              <ChooseButton>
                <ChooseButtonText choosed={choosedPending}>
                  Pendentes
                </ChooseButtonText>
              </ChooseButton>
              <ChooseButton>
                <ChooseButtonText>Entregues</ChooseButtonText>
              </ChooseButton>
            </ChooseButtonContainer>
          </HeaderContainer>

          <ListContainer>
            <ItemContainer>
              <HeaderItemContainer>
                <Icon name="local-shipping" color="#7D40E7" size={24} />
                <HeaderItemText>Encomenda 01</HeaderItemText>
              </HeaderItemContainer>
              <TimelineContainer>
                <Time>
                  <BallContainer>
                    <InvisibleHorizontalLine first />
                    <Ball active />
                    <HorizontalLine first />
                  </BallContainer>
                  <TimeText>Aguardando Retirada</TimeText>
                </Time>

                <Time>
                  <BallContainer>
                    <HorizontalLine second />
                    <Ball />
                    <HorizontalLine second />
                  </BallContainer>
                  <TimeText>Retirada</TimeText>
                </Time>
                <Time>
                  <BallContainer>
                    <HorizontalLine />
                    <Ball />
                    <InvisibleHorizontalLine />
                  </BallContainer>
                  <TimeText>Entregue</TimeText>
                </Time>
              </TimelineContainer>
              <HeaderFooterContainer>
                <InformationContainer>
                  <DateLabelText>Data</DateLabelText>
                  <DateText>15/01/2020</DateText>
                </InformationContainer>
                <InformationContainer>
                  <DateLabelText>Cidade</DateLabelText>
                  <DateText>Rio do Sul</DateText>
                </InformationContainer>
                <InformationContainer>
                  <Details>
                    <DetailsText>Ver detalhes</DetailsText>
                  </Details>
                </InformationContainer>
              </HeaderFooterContainer>
            </ItemContainer>
          </ListContainer>
        </DeliveryContainer>
      </Container>
    </Background>
  );
}

Home.propTypes = {
  isFocused: PropTypes.bool,
};

export default withNavigationFocus(Home);
