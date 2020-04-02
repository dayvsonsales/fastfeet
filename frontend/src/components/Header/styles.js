import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  border: 1px solid #dddddd;
`;

export const Content = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: scroll;

    padding-top: 20px;
    padding-bottom: 20px;

    img {
      margin-right: 30px;
      width: 135px;
      height: 26px;
    }

    div {
      border-left: 1px solid #dddddd;
      height: 32px;
    }

    a:first-child {
      padding-left: 30px;
    }

    a {
      font-weight: bold;
      color: #999999;
    }

    & a {
      margin-left: 20px;
    }

    a.is-active {
      color: #444444;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-self: flex-end;
  margin-left: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #666666;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #de3b3b;
    }
  }
`;
