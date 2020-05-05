import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    padding: 8px;
    border-radius: 4px;
    background: #ff9000;
    opacity: 0;
    font-size: 14px;
    font-weight: 500px;
    transition: opacity 0.4s;
    visibility: hidden;
    color: #312e38;

    &::before {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-style: solid;
      border-color: #ff9000 transparent;
      border-width: 6px 6px 0 6px;
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
