import styled from 'styled-components';

export const Container = styled.div`
  display: ${(props) => (!props.show ? 'none' : 'flex')};

  align-items: center;
  justify-content: center;
  flex-direction: column;

  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;

  z-index: 10;
`;

export const ModalContainer = styled.div`
  width: 450px;
  height: 353px;
  border-radius: 4px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 10px #00000033;

  padding: 25px;

  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
`;
