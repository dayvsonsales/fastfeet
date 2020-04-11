import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Wrapper = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  margin-top: 50px;
  align-items: center;
`;

export const Container = styled.View`
  flex: 1;
  padding: 40px;
  background: #fff;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const Separator = styled.View`
  background: #999;
  height: 1px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const LogoutButton = styled(Button)`
  margin-top: 15px;
  background: #e74040;
`;

export const Avatar = styled.View`
  align-items: center;
  justify-content: center;
  margin: 83px 120px 40px 120px;
`;

export const InformationContainer = styled.View`
  flex-direction: column;
  margin-bottom: 15px;
`;

export const InformationLabel = styled.Text`
  margin-bottom: 5px;
  color: #666666;
  font-size: 12px;
`;

export const InformationText = styled.Text`
  color: #444444;
  font-size: 22px;
  font-weight: bold;
`;
