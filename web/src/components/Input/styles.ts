import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isErrored: boolean;
  isFilled: boolean;
  isFocused: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  background: #232129;
  border: 2px solid #232129;
  border-radius: 10px;
  color: #666360;

  ${({ isErrored }) =>
    isErrored &&
    css`
      border-color: #c53030;
    `}

  ${({ isFilled }) =>
    isFilled &&
    css`
      color: #ff9000;
    `}

  ${({ isFocused }) =>
    isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  & + div {
    margin-top: 8px;
  }

  svg {
    margin-right: 16px;
  }

  input {
    flex: 1;
    border: 0;
    background: transparent;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
