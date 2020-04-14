import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  label {
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
    img {
      height: 150px;
      width: 150px;
      border-radius: 50%;
      background: #ffffff 0% 0% no-repeat padding-box;
      border: 1px dashed #dddddd;
      image-orientation: from-image;
    }
    input {
      display: none;
    }
    div {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      height: 150px;
      width: 150px;
      border-radius: 50%;
      background: #ffffff 0% 0% no-repeat padding-box;
      border: 1px dashed #dddddd;
      strong {
        text-align: left;
        letter-spacing: 0px;
        color: #dddddd;
        opacity: 1;
      }
    }
  }
`;
