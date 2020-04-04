import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 34px;
  padding-left: 120px;
  margin-right: 120px;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-self: flex-start;

    strong {
      color: #444444;
      font-size: 24px;
      text-align: right;
      letter-spacing: 0;
      color: #444444;
    }
  }
`;

export const ProblemInformation = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 60px;

  strong {
    color: #444444;
  }

  span {
    margin-top: 5px;
    text-align: left;
    letter-spacing: 0px;
    color: #666666;
    font-size: 16px;
    line-height: 1.6;
  }
`;
