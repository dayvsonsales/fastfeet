import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 270px;
  padding-left: 270px;
  padding-top: 27px;

  @media (max-width: 1024px) {
    padding-right: 0;
    padding-left: 0;
  }

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;

    @media (max-width: 1024px) {
      align-items: center;
      justify-content: center;
    }

    div {
      display: flex;
      flex-direction: row;

      @media (max-width: 1024px) {
        margin-top: 10px;
      }

      button:first-child {
        padding-right: 20px;
      }
      button:last-child {
        margin-left: 16px;
      }
    }
    strong {
      color: #444444;
      font-size: 24px;
      text-align: right;
      letter-spacing: 0;
      color: #444444;
    }
  }
  section {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    background: #ffffff 0% 0% no-repeat padding-box;
    border-radius: 4px;
  }
  input {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding: 15px;
    color: #999999;
    &::placeholder {
      text-align: left;
      letter-spacing: 0px;
      color: #999999;
      opacity: 1;
    }
  }
  @media (min-width: 1025px) {
    .row:nth-child(even) {
      margin-top: -30px;
      margin-bottom: -30px;
    }
  }
`;

export const Row = styled.div.attrs({
  className: 'row',
})`
  display: flex;
  flex-direction: row;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const Column = styled.div`
  width: ${(props) => (props.width ? props.width : '100%')};
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: ${(props) => (props.padding ? props.padding : '30px')};
  padding-right: 15px;

  @media (max-width: 1024px) {
    width: 100% !important;
    padding: 0;
    padding-left: 30px !important;
    padding-right: 30px !important;
    padding-bottom: 0 !important;
    margin-top: 10px;
    margin-bottom: 10px;

    input {
      width: 100% !important;
    }
  }

  label {
    text-align: left;
    letter-spacing: 0px;
    color: #444444;
    font-weight: bold;
    margin-bottom: 10px;
  }

  &:first-child {
    padding-left: 30px !important;
  }
  &:nth-child(even) {
    padding-left: 0px;
  }
  &:last-child {
    padding-left: 0px;
    padding-right: 30px;
  }
`;
