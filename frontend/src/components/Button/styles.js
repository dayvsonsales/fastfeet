import styled, { css } from 'styled-components';

export const Button = styled.button`
  display: flex;
  align-items: center;
  padding-top: 5px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 5px;

  border-radius: 4px;
  border: 1px solid #eee;

  ${(props) =>
    props.grey
      ? css`
          background: #cccccc 0% 0% no-repeat padding-box;
          color: #ffffff;
        `
      : css`
          background: #7d40e7 0% 0% no-repeat padding-box;
          color: #fff;
        `}

  svg {
    vertical-align: middle;
  }

  span {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
    margin-top: 2px;
  }
`;
