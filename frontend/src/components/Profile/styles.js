import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    border-radius: 50%;
    padding: 8px;
    background: ${(props) => props.color} 0% 0% no-repeat padding-box;
    margin-right: 5px;
    color: ${(props) => darken(0.5, props.color)};
    text-transform: uppercase;
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 5px;
    image-orientation: from-image;
  }
`;
