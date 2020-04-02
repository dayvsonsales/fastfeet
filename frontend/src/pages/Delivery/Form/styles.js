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

      button {
        display: flex;
        align-items: center;
        padding-top: 5px;
        padding-left: 15px;
        padding-right: 15px;
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
          margin-top: 2px;
        }
      }

      button:disabled {
        background: #cccccc 0% 0% no-repeat padding-box;
        color: #ffffff;
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
`;

export const FormContainer = styled.form`
  margin-top: 20px;
  padding: 30px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 4px;
`;
