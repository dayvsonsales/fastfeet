import styled from 'styled-components';
import Select from 'react-select';

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
    min-width: 234px;
    min-height: 36px;
    max-width: 234px;
    max-height: 234px;
    align-self: center;
    margin: 23px auto;
    image-orientation: from-image;
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

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TSelect = styled(Select)`
  width: 250px;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 0px;
    width: 100%;
    margin-top: 10px;
  }
`;
