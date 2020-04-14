import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const Background = styled(LinearGradient).attrs({
  colors: ['#7D40E7', '#FFFFFF'],
  locations: [0.25, 0.25],
})`
  flex: 1;
  background-color: black;
`;

export const Container = styled.ScrollView`
  margin-top: ${() => (Platform.OS === 'ios' ? '90px' : '60px')};
  padding: 20px;
  flex: 1;
`;

export const ProblemContainer = styled.KeyboardAvoidingView`
  flex-direction: column;
  padding: 20px;
  height: 300px;
  border-radius: 4px;
  background: #ffffff;
  border: 1px solid #0000001a;
`;

export const ProblemInput = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
  multiline: true,
})`
  font-size: 16px;
  ${() =>
    Platform.OS === 'ios' &&
    css`
      height: 300px;
    `}
`;

export const SubmitButton = styled.TouchableOpacity`
  background: #7d40e7;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 15px;
  margin-top: 20px;
`;

export const SubmitButtonText = styled.Text`
  color: #ffffff;
  font-weight: bold;
`;
