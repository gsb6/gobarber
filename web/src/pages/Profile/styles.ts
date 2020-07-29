import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
`;

export const Header = styled.header`
  height: 144px;
  display: flex;
  align-items: center;
  background: #28262e;

  a {
    margin-left: 10vw;
    color: #999591;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  margin-top: -72px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    width: 340px;
    display: flex;
    flex-direction: column;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      text-align: left;
      font-size: 20px;
    }

    & > h1 + div + div {
      margin-bottom: 24px;
    }
  }
`;

export const Avatar = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0;
    bottom: 0;
    border: 0;
    border-radius: 50%;
    background: #ff9900;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#ff9900')};
    }

    input {
      display: none;
    }

    svg {
      width: 24px;
      height: 24px;
      color: #312e38;
    }
  }
`;
