import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { format, parseISO, isToday, isAfter } from 'date-fns';
import DayPicker, { DayModifiers } from 'react-day-picker';
import ptBR from 'date-fns/locale/pt-BR';
import { FiPower, FiClock } from 'react-icons/fi';

import 'react-day-picker/lib/style.css';

import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import LogoSVG from '../../assets/logo.svg';

import * as S from './styles';
import api from '../../services/api';

interface Appointment {
  id: string;
  date: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

interface MonthlyAvailability {
  day: number;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [monthlyAvailability, setMonthlyAvailability] = useState<
    MonthlyAvailability[]
  >([]);

  const disabledDays = useMemo(() => {
    const unavailableDays = monthlyAvailability.filter((day) => !day.available);

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    return unavailableDays.map((date) => new Date(year, month, date.day));
  }, [monthlyAvailability, currentMonth]);

  const printSelectedDate = useMemo(() => {
    const weekDayNumber = selectedDate.getDay();
    const weekLocale = format(selectedDate, 'cccc', { locale: ptBR });
    const weekSuffix = weekDayNumber > 0 && weekDayNumber < 6 ? '-feira' : '';

    const weekDay =
      weekLocale.charAt(0).toUpperCase() + weekLocale.slice(1) + weekSuffix;

    const dayMonthLocale = format(selectedDate, "dd 'de' MMMM", {
      locale: ptBR,
    });

    return `${weekDay}, ${dayMonthLocale}`;
  }, [selectedDate]);

  const nextAppointment = useMemo(() => {
    return appointments.find((appointment) =>
      isAfter(parseISO(appointment.date), new Date()),
    );
  }, [appointments]);

  const morningAppointments = useMemo(() => {
    return appointments.filter(
      (appointment) => parseISO(appointment.date).getHours() < 12,
    );
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(
      (appointment) => parseISO(appointment.date).getHours() >= 12,
    );
  }, [appointments]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const formatAppointmentHour = useCallback((date: string) => {
    return format(parseISO(date), 'HH:mm');
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/monthly-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((response) => setMonthlyAvailability(response.data));
  }, [currentMonth, user.id]);

  useEffect(() => {
    api
      .get(`/appointments/me`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        setAppointments(response.data);
      });
  }, [selectedDate]);

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
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
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
            <span>{printSelectedDate}</span>
          </S.Today>

          {nextAppointment && isToday(selectedDate) && (
            <S.NextAppointment>
              <strong>Próximo agendamento</strong>

              <div>
                <div>
                  <img
                    src={nextAppointment.user.avatar_url}
                    alt={nextAppointment.user.name}
                  />
                  <strong>{nextAppointment.user.name}</strong>
                  <span>
                    <FiClock />
                    {formatAppointmentHour(nextAppointment.date)}
                  </span>
                </div>
              </div>
            </S.NextAppointment>
          )}

          <S.Appointments>
            <strong>Manhã</strong>

            {!morningAppointments.length && (
              <p>Nenhum agendamento para este período.</p>
            )}

            {morningAppointments.map(({ id, date, user }) => (
              <S.Appointment key={id}>
                <span>
                  <FiClock />
                  {formatAppointmentHour(date)}
                </span>
                <div>
                  <img src={user.avatar_url} alt={user.name} />
                  <strong>{user.name}</strong>
                </div>
              </S.Appointment>
            ))}
          </S.Appointments>

          <S.Appointments>
            <strong>Tarde</strong>

            {!afternoonAppointments.length && (
              <p>Nenhum agendamento para este período.</p>
            )}

            {afternoonAppointments.map(({ id, date, user }) => (
              <S.Appointment key={id}>
                <span>
                  <FiClock />
                  {formatAppointmentHour(date)}
                </span>
                <div>
                  <img src={user.avatar_url} alt={user.name} />
                  <strong>{user.name}</strong>
                </div>
              </S.Appointment>
            ))}
          </S.Appointments>
        </S.Schedule>
        <S.Calendar>
          <DayPicker
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </S.Calendar>
      </S.Content>
    </S.Container>
  );
};

export default Dashboard;
