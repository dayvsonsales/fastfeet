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

export const DeliveryInformation = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 14px;
    color: #444444;
  }

  img {
    width: 234px;
    height: 36px;
    align-self: center;
    margin: 23px auto;
  }
`;

export const Street = styled.div`
  color: #666666;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 16px;
`;

export const CityAndState = styled.div`
  color: #666666;
  margin-bottom: 5px;
  font-size: 16px;
`;

export const Zip = styled.div`
  color: #666666;
  margin-bottom: 5px;
  font-size: 16px;
`;

export const Date = styled.div`
  color: #666666;
  margin-bottom: 5px;
  font-size: 16px;

  margin-top: 5px;

  strong {
    font-size: 16px;
    font-weight: bold;
    color: #666666;
    margin-right: 5px;
  }
`;

export const HorizontalLine = styled.div`
  border-bottom: 1px solid #f5f5f5;
  margin-top: 5px;
  margin-bottom: 5px;
`;
