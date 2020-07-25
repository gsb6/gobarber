import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    border: 0;
    background: transparent;
    cursor: pointer;

    svg {
      width: 20px;
      height: 20px;
      color: #999591;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    line-height: 24px;
  }

  span {
    color: #f4ede8;
  }

  strong {
    color: #ff9000;
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Schedule = styled.aside`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }
`;

export const Today = styled.div`
  margin-top: 8px;
  color: #ff9900;
  font-weight: 500;

  span + span::before {
    content: '|';
    margin: 0 8px;
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400;
  }

  > div {
    margin-top: 16px;
    padding: 16px 0;
    border-radius: 10px;
    background: #3e3b47;
  }

  div > div {
    padding: 0 16px;
    display: flex;
    align-items: center;
    border-left: 2px solid #ff9900;

    img {
      width: 80px;
      height: 80px;
      margin-right: 16px;
      border-radius: 50%;
    }

    strong {
      color: #f4ede8;
    }

    span {
      display: flex;
      align-items: center;
      margin-left: auto;
      color: #999591;

      svg {
        margin-right: 8px;
        color: #ff9900;
      }
    }
  }
`;

export const Calendar = styled.div`
  width: 380px;
`;
