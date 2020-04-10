import React, { useEffect, useState } from 'react';
import { withNavigationFocus } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { parseISO, format } from 'date-fns';
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

function Home({ isFocused, navigation }) {
  const [deliveries, setDeliveries] = useState([]);
  const [choosedPending, setChoosedPending] = useState(true);

  const user = useSelector((state) => state.user.profile);

  async function loadDeliveries(type = 'opened') {
    const response = await api.get(
      `/deliveryman/${user.id}/deliveries/${type}`
    );

    console.tron.log('alo');

    const data = response.data.rows.map((delivery) => ({
      ...delivery,
      formatted_date: format(parseISO(delivery.createdAt), 'dd/MM/yyyy'),
    }));

    setDeliveries(data);

    if (type === 'opened') {
      setChoosedPending(true);
    } else {
      setChoosedPending(false);
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadDeliveries();
    }
  }, [isFocused]);

  async function handleDetail(id) {
    navigation.navigate('DeliveryDetails', { id });
  }

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
          <TouchableOpacity>
            <Icon name="exit-to-app" color="#E74040" size={24} />
          </TouchableOpacity>
        </ProfileContainer>
        <DeliveryContainer>
          <HeaderContainer>
            <Title>Entregas</Title>
            <ChooseButtonContainer>
              <ChooseButton onClick={() => loadDeliveries()}>
                <ChooseButtonText choosed={choosedPending}>
                  Pendentes
                </ChooseButtonText>
              </ChooseButton>
              <ChooseButton onClick={() => loadDeliveries('ended')}>
                <ChooseButtonText>Entregues</ChooseButtonText>
              </ChooseButton>
            </ChooseButtonContainer>
          </HeaderContainer>

          <List
            data={deliveries}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <ListContainer>
                <ItemContainer>
                  <HeaderItemContainer>
                    <Icon name="local-shipping" color="#7D40E7" size={24} />
                    <HeaderItemText>Encomenda {item.id}</HeaderItemText>
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
                        <Ball active={item.start_date} />
                        <HorizontalLine second />
                      </BallContainer>
                      <TimeText>Retirada</TimeText>
                    </Time>
                    <Time>
                      <BallContainer>
                        <HorizontalLine />
                        <Ball active={item.end_date} />
                        <InvisibleHorizontalLine />
                      </BallContainer>
                      <TimeText>Entregue</TimeText>
                    </Time>
                  </TimelineContainer>
                  <HeaderFooterContainer>
                    <InformationContainer>
                      <DateLabelText>Data</DateLabelText>
                      <DateText>{item.formatted_date}</DateText>
                    </InformationContainer>
                    <InformationContainer>
                      <DateLabelText>Cidade</DateLabelText>
                      <DateText>{item.recipient.city}</DateText>
                    </InformationContainer>
                    <InformationContainer>
                      <TouchableOpacity onPress={() => handleDetail(item.id)}>
                        <Details>
                          <DetailsText>Ver detalhes</DetailsText>
                        </Details>
                      </TouchableOpacity>
                    </InformationContainer>
                  </HeaderFooterContainer>
                </ItemContainer>
              </ListContainer>
            )}
          />
        </DeliveryContainer>
      </Container>
    </Background>
  );
}

Home.propTypes = {
  isFocused: PropTypes.bool,
};

export default withNavigationFocus(Home);
