import styled from 'styled-components/native';
import { darken } from 'polished';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: ${(props) => props.color} 0% 0% no-repeat padding-box;
  margin-right: 5px;

  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius};
`;

export const Text = styled.Text`
  text-transform: uppercase;
  font-size: ${(props) => props.fontSize};
  color: ${(props) => darken(0.5, props.color)};
`;
