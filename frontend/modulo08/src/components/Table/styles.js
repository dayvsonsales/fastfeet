import styled from 'styled-components';

export const Table = styled.table`
  margin-top: 15px;
  width: 100%;
  overflow: scroll;
  border-collapse: separate;
  border-spacing: 0 15px;

  thead > tr > th {
    font-weight: bold;
    font-size: 16px;
    text-align: left;
    letter-spacing: 0;
    color: #444444;
    padding: 15px;
    padding-bottom: 0;
  }

  tbody {
    box-shadow: 0 0 0 1px #fff;
    border-radius: 4px;
    background: #fff;
  }

  tbody td {
    padding: 15px;
    text-overflow: ellipsis;
    word-break: break-all;
    color: #666666;
  }
`;

export const Container = styled.div`
  overflow-x: auto;
`;
