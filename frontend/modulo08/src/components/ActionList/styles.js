import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 34px;

  button {
    padding-top: 5px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 5px;
    background: #7d40e7 0% 0% no-repeat padding-box;
    color: #fff;
    border-radius: 4px;
    border: 1px solid #eee;

    svg {
      vertical-align: middle;
    }

    span {
      text-transform: uppercase;
      font-size: 12px;
      font-weight: bold;
      margin-left: 7px;
    }
  }
`;
