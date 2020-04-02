import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Status = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  border-radius: 12px;
  background: ${(props) => props.backgroundColor} 0% 0% no-repeat padding-box;
  text-transform: uppercase;
  color: ${(props) => props.color};
  padding: 5px;
  font-weight: bold;
  position: absolute;
  margin: -12px;

  div {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin-right: 5px;
  }
`;
