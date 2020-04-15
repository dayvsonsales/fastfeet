import styled from 'styled-components';

export const Table = styled.table.attrs({
  border: 0,
})`
  margin-top: 15px;
  width: 100%;
  overflow: scroll;
  border-collapse: separate;
  border-spacing: 0 20px;

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
    border-radius: 4px;
    background: #fff;
    border-left: 0;
    border-right: 0;
  }

  tbody td {
    box-shadow: 0 0 0 2px #fff;
    padding: 10px;
    padding-left: 15px;
    text-overflow: ellipsis;
    word-break: break-all;
    color: #666666;

    border-radius: 4px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-x: inherit;

  @media (max-width: 768px) {
    overflow: auto;
    margin-right: 10px;
  }
`;
