import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    border-radius: 50%;
    padding: 8px;
    background: #f4effc 0% 0% no-repeat padding-box;
    margin-right: 5px;
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 5px;
  }
`;
