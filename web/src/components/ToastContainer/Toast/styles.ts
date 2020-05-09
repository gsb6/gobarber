import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface Props {
  noDescription?: boolean;
  type?: 'success' | 'error' | 'info';
}

const types = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
};

export const Container = styled(animated.div)<Props>`
  width: 360px;
  padding: 16px 30px 16px 16px;
  position: relative;
  display: flex;
  border-radius: 5px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  & + div {
    margin-top: 8px;
  }

  ${({ type }) => types[type || 'info']}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      line-height: 20px;
      opacity: 0.8;
    }
  }

  button {
    position: absolute;
    top: 20px;
    right: 16px;
    border: 0;
    background: transparent;
    opacity: 0.6;
    color: inherit;
  }

  ${({ noDescription }) =>
    !noDescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;
