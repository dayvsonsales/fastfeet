import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 34px;
  padding-left: 120px;
  margin-right: 120px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding-left: 10px;
    margin-right: 0;
  }

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
