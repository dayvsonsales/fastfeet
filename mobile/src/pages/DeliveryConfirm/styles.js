import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { RNCamera } from 'react-native-camera';

export const Background = styled(LinearGradient).attrs({
  colors: ['#7D40E7', '#FFFFFF'],
  locations: [0.25, 0.25],
})`
  flex: 1;
  background-color: black;
`;

export const Container = styled.View`
  margin-top: 90px;
  padding: 20px;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

export const CameraContainer = styled.View`
  flex: 1;
  border: 1px solid #0000001a;
  background: #0000001a;
  border-radius: 4px;
  margin-bottom: 10px;
  overflow: hidden;
  position: relative;
`;

export const SubmitButton = styled.TouchableOpacity`
  border-radius: 4px;
  align-items: center;
  background: #7d40e7;
  padding: 10px;
  border: 1px solid #eee;
`;

export const SubmitText = styled.Text`
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
`;

export const Camera = styled(RNCamera)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const TakeButtonContainer = styled.TouchableOpacity`
  position: absolute;
  width: 61px;
  height: 61px;
  border-radius: 30.5px;
  background: #0000004d;
  align-items: center;
  justify-content: center;
  bottom: 10px;
  align-self: center;
`;
