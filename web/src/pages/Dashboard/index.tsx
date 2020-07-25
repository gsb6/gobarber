import React from 'react';
import { FiPower, FiClock } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import LogoSVG from '../../assets/logo.svg';

import * as S from './styles';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <S.Container>
      <S.Header>
        <S.HeaderContent>
          <img src={LogoSVG} alt="GoBarber" />

          <S.Profile>
            <img
              src="https://avatars1.githubusercontent.com/u/59578980?s=460&u=5824ad2edf97f9b4c6ce9039b20e432c00d42230&v=4"
              alt={user.name}
            />

            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </S.Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </S.HeaderContent>
      </S.Header>

      <S.Content>
        <S.Schedule>
          <h1>Horários agendados</h1>

          <S.Today>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </S.Today>

          <S.NextAppointment>
            <strong>Atendimento a seguir</strong>

            <div>
              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/59578980?s=460&u=5824ad2edf97f9b4c6ce9039b20e432c00d42230&v=4"
                  alt="Gabriel Brunichaki"
                />
                <strong>Gabriel Brunichaki</strong>
                <span>
                  <FiClock />
                  08:00
                </span>
              </div>
            </div>
          </S.NextAppointment>
        </S.Schedule>
        <S.Calendar />
      </S.Content>
    </S.Container>
  );
};

export default Dashboard;
