import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 270px;
  padding-left: 270px;
  padding-top: 27px;

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    div {
      display: flex;
      flex-direction: row;

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

  .row:nth-child(even) {
    margin-top: -30px;
    margin-bottom: -30px;
  }
`;

export const Row = styled.div.attrs({
  className: 'row',
})`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const Column = styled.div`
  width: ${(props) => (props.width ? props.width : '100%')};
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: ${(props) => (props.padding ? props.padding : '30px')}
    ${(props) => props.important && '!important'};

  label {
    text-align: left;
    letter-spacing: 0px;
    color: #444444;
    font-weight: bold;
    margin-bottom: 10px;
  }

  &:nth-child(even) {
    padding-left: 0px;
    padding-right: 0px;
  }

  &:last-child {
    padding-right: 30px;
  }
`;
