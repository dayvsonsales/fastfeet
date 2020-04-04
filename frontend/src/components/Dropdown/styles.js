import styled from 'styled-components';

export const DropdownContainer = styled.div``;

export const Dropdown = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #ffffff 0% 0% no-repeat padding-box;
  white-space: nowrap;

  &:hover {
    .dropdown-content {
      display: flex;
      position: absolute;

      /* margin-top: 75px;

      @-moz-document url-prefix() {
        & {
          margin-top: 150px;
        }
      } */

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
        border-bottom: 5px solid white;
        -webkit-filter: drop-shadow(0px -2px 2px #0000001a);
        filter: drop-shadow(0px -2px 2px #0000001a);
      }
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
  padding: 15px 15px 15px 15px;
  min-width: 120px;
  z-index: 1;

  border-radius: 4px;

  a {
    text-decoration: none;
    color: #999999;
    font-size: 16px;
    padding: 5px;
    align-items: center;
    min-width: 120px;

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
