import styled from 'styled-components';

export const Dropdown = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #ffffff 0% 0% no-repeat padding-box;
  white-space: nowrap;

  svg {
    cursor: pointer;
  }

  .dropdown-content {
    display: ${(props) => (props.opened ? 'flex' : 'none')};
    position: absolute;

    top: calc(100% + 5px);

    &::before {
      content: '';
      position: absolute;
      left: calc(50% - 5px);
      top: -5px;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid #fff;
      -webkit-filter: drop-shadow(0px -2px 2px #0000001a);
      filter: drop-shadow(0px -2px 2px #0000001a);
    }
  }
`;

export const DropdownContent = styled.div.attrs({
  className: 'dropdown-content',
})`
  display: none;
  flex-direction: column;
  position: absolute;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 2px #00000026;
  padding: 15px 10px 15px 10px;
  min-width: 120px;
  z-index: 1;
  align-items: flex-start;
  justify-content: flex-start;

  border-radius: 4px;

  button {
    border: 0;
    text-decoration: none;
    padding: 5px;
    padding-left: 0;
    min-width: 140px;
    width: 100%;
    text-align: left !important;
    background: #ffffff 0% 0% no-repeat padding-box;

    span {
      color: #999999;
      font-size: 16px;
      letter-spacing: 0px;
      opacity: 1;
    }

    svg {
      margin-right: 10px;
      width: 16px;
      height: 16px;
      vertical-align: middle;
    }
  }

  button:not(:last-child) {
    border-bottom: 1px solid #eeeeee;
  }

  a {
    border: 0;
    text-decoration: none;
    padding: 5px;
    padding-left: 0;
    min-width: 140px;
    width: 100%;
    background: #ffffff 0% 0% no-repeat padding-box;

    color: #999999;
    font-size: 16px;
    letter-spacing: 0px;
    opacity: 1;

    svg {
      margin-right: 10px;
      width: 16px;
      height: 16px;
      vertical-align: middle;
    }
  }

  a:not(:last-child) {
    border-bottom: 1px solid #eeeeee;
  }
`;
