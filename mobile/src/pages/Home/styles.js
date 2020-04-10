import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  margin-top: 50px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const ProfileContainer = styled.View`
  flex-direction: row;
  margin: 20px;
  align-items: center;
  justify-content: space-between;
`;

export const Salute = styled.View`
  flex-direction: column;
  margin-left: 15px;
`;

export const WelcomeContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Welcome = styled.Text`
  color: grey;
`;

export const Slug = styled.Text``;

export const Name = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-weight: bold;
  font-size: 24px;
  margin-top: 5px;
  width: 200px;
`;

export const DeliveryContainer = styled.View`
  flex-direction: column;
  margin: 20px;
  flex: 1;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

export const ChooseButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

export const ChooseButton = styled(TouchableOpacity)`
  border: 0;
  background: #fff;
  padding-left: 10px;
`;

export const ChooseButtonText = styled.Text`
  font-size: 14px;
  color: ${(props) => (props.choosed ? '#7D40E7' : '#999')};

  ${(props) =>
    props.choosed &&
    css`
      font-weight: bold;
      text-decoration-line: underline;
    `}
`;

export const ListContainer = styled.View`
  flex-direction: column;
  margin-top: 10px;
`;

export const ItemContainer = styled.View`
  flex-direction: column;
  padding: 10px 20px 20px 20px;
  border-radius: 4px;
  border: 1px solid #0000001a;
`;
export const HeaderItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const HeaderItemText = styled.Text`
  color: #7d40e7;
  font-weight: bold;
  margin-left: 10px;
  font-size: 16px;
`;
export const TimelineContainer = styled.View`
  flex-direction: row;
  margin-top: 24px;
  justify-content: center;
`;
export const Time = styled.View`
  align-items: center;
`;
export const Ball = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  border: 1px solid #7d40e7;
  background-color: ${(props) => (props.active ? '#7d40e7' : '#FFFFFF')};
`;
export const TimeText = styled.Text.attrs({
  numberOfLines: 2,
})`
  margin-top: 5px;
  color: #999999;
  font-size: 10px;
  width: 70px;
  align-self: center;
  text-align: center;
`;
export const InvisibleHorizontalLine = styled.View`
  height: 0px;
  width: ${(props) => (props.first ? '40px' : props.second ? '65px' : '40px')};
  background-color: #7d40e7;
`;
export const HorizontalLine = styled.View`
  height: 1px;
  width: ${(props) => (props.first ? '40px' : props.second ? '65px' : '40px')};
  background-color: #7d40e7;
`;
export const BallContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const HeaderFooterContainer = styled.View`
  flex-direction: row;
  padding: 20px;
  margin-left: -20px;
  margin-right: -20px;
  margin-bottom: -20px;
  margin-top: 20px;
  border: 1px solid #eee;
  background: #f8f9fd;
  justify-content: space-between;
  align-items: center;
`;
export const InformationContainer = styled.View`
  flex-direction: column;
`;
export const DateLabelText = styled.Text`
  color: #999999;
  font-size: 8px;
`;
export const DateText = styled.Text`
  color: #444444;
  font-size: 12px;
  font-weight: bold;
`;
export const Details = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`;
export const DetailsText = styled.Text`
  color: #7d40e7;
  font-size: 12px;
  font-weight: bold;
`;
