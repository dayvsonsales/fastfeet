import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 237px;
  border-radius: 4px;
  border: 1px solid #dddddd;
  background: #ffffff 0% 0% no-repeat padding-box;
  padding: 5px 20px 5px 10px;
  align-items: center;
`;

export const Input = styled.input.attrs((props) => ({
  type: 'text',
  placeholder: props.placeholder,
}))`
  border: 0;
  margin-left: 8px;
  width: 100%;
  text-align: left;
  letter-spacing: 0;
  color: #999999;
`;
