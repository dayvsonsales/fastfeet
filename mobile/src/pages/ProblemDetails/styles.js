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
  margin-top: ${() => (Platform.OS === 'ios' ? '90px' : '80px')};
  padding: 20px;
  flex: 1;
`;

export const ItemContainer = styled.View`
  flex-direction: column;
  padding-bottom: 30px;
`;

export const Header = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: #ffffff;
  font-weight: bold;
  font-size: 18px;
`;

export const Problem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #0000001a;
  padding: 20px;
  margin-top: 12.5px;
  align-items: center;
`;

export const ProblemText = styled.Text.attrs({})`
  font-size: 16px;
  color: #999999;
  width: 225px;
`;

export const ProblemDate = styled.Text`
  font-size: 12px;
  color: #c1c1c1;
`;
