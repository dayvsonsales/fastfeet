import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #7d40e7;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 10px #00000033;

  min-width: 350px;
  min-height: 200px;

  border-radius: 4px;
  padding-top: 60px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 60px;
`;

export const Content = styled.div`
  width: 100%;
  text-align: center;

  img {
    width: 259px;
    height: 44px;
    margin-left: -20px;
    align-self: flex-start;
    image-orientation: from-image;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      align-self: flex-start;
      text-transform: uppercase;
      color: #444444;
      padding-bottom: 10px;
      padding-top: 5px;
      font-weight: bold;
    }

    input {
      background: #fff;
      border: 1px solid #dddddd;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #999999;
      margin: 0 0 10px;
      width: 100%;

      &::placeholder {
        color: #999999;
        align-self: center;
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #7d40e7 0% 0% no-repeat padding-box;
      border-radius: 4px;
      opacity: 1;
      color: #fff;
      border: 0;

      padding: 12px;

      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7d40e7')};
      }
    }
  }
`;
