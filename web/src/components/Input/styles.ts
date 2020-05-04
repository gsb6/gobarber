import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  background: #232129;
  border: 2px solid #232129;
  border-radius: 10px;
  color: #666360;

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
