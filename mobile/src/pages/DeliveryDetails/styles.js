import styled, { css } from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const Background = styled(LinearGradient).attrs({
  colors: ['#7D40E7', '#FFFFFF'],
  locations: [0.25, 0.25],
})`
  flex: 1;
  background-color: black;
`;

export const Wrapper = styled.ScrollView`
  flex: 1;
  margin-top: ${() => (Platform.OS === 'ios' ? '90px' : '60px')};
`;

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const DataContainer = styled.View`
  border-radius: 4px;
  background: #ffffff;
  padding: 15px;
  margin-bottom: 10px;
  ${() =>
    Platform.OS === 'android'
      ? css`
          elevation: 3;
        `
      : css`
          border: 1px solid #0000001a;
        `}
`;
export const Header = styled.View`
  flex-direction: row;
`;
export const Title = styled.Text`
  color: #7d40e7;
  margin-left: 5px;
  font-weight: bold;
  font-size: 14px;
`;
export const Data = styled.View`
  flex-direction: column;
  margin-bottom: 15px;
  margin-top: 10px;
`;
export const DataLabel = styled.Text`
  color: #999999;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;
export const DataText = styled.Text`
  color: #666666;
  font-size: 14px;
`;
export const DataGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: -5px;
`;

export const ButtonContainer = styled.View`
  border-radius: 4px;
  background: #f8f9fd;
  flex-direction: row;
  justify-content: space-around;

  ${() =>
    Platform.OS === 'android'
      ? css`
          elevation: 2;
        `
      : css`
          border: 1px solid #0000001a;
        `}
`;

export const Button = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const ButtonText = styled.Text.attrs({
  numberOfLines: 2,
})`
  margin-top: 5px;
  color: #999999;
  font-size: 12px;
  text-align: center;
  width: 70%;
`;
export const VerticalLine = styled.View`
  width: 1px;
  height: 100px;
  border: 1px solid #0000001a;
  background-color: #ffffff;
`;
