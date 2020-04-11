import React from 'react';
import { useSelector } from 'react-redux';

import { Image, TouchableOpacity } from 'react-native';
import {
  Container,
  LogoutButton,
  Avatar,
  InformationContainer,
  InformationLabel,
  InformationText,
} from './styles';

import ProfilePhoto from '~/components/Profile';

import { persistor } from '~/store';

export default function Profile() {
  const profile = useSelector((state) => state.user.profile);

  function handleLogout() {
    persistor.purge();
  }

  return (
    <Container>
      <Avatar>
        {profile.avatar ? (
          <Image
            style={{ width: 136, height: 136, borderRadius: 68 }}
            source={{ uri: profile.avatar.url }}
            onError={(e) => {
              console.tron.log(e);
            }}
          />
        ) : (
          <ProfilePhoto
            width="138px"
            height="138px"
            borderRadius="68px"
            fontSize="60px">
            {profile.slug}
          </ProfilePhoto>
        )}
      </Avatar>

      <InformationContainer>
        <InformationLabel>Nome completo</InformationLabel>
        <InformationText>{profile.name}</InformationText>
      </InformationContainer>

      <InformationContainer>
        <InformationLabel>Email</InformationLabel>
        <InformationText>{profile.email}</InformationText>
      </InformationContainer>

      <InformationContainer>
        <InformationLabel>Data de cadastro</InformationLabel>
        <InformationText>{profile.formatted_created_at}</InformationText>
      </InformationContainer>

      <TouchableOpacity onPress={handleLogout}>
        <LogoutButton>Logout</LogoutButton>
      </TouchableOpacity>
    </Container>
  );
}
