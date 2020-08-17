import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { Alert, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import * as S from './styles';
import { date } from 'yup';

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

export interface DayAvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const { goBack, navigate } = useNavigation();
  const { user } = useAuth();
  const { providerId } = route.params as RouteParams;

  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(providerId);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [dayAvailability, setDayAvailability] = useState<DayAvailabilityItem[]>(
    [],
  );

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectProvider = useCallback(
    (id: string) => {
      setSelectedProvider(id);
    },
    [goBack],
  );

  const handleOpenDatePicker = useCallback(() => {
    setShowDatePicker(true);
  }, []);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      setShowDatePicker(false);

      if (!date) return;

      setSelectedDate(date);
    },
    [],
  );

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const appointmentDate = new Date(selectedDate);

      appointmentDate.setHours(selectedHour);
      appointmentDate.setMinutes(0);

      await api.post('/appointments', {
        provider_id: selectedProvider,
        date: appointmentDate,
      });

      navigate('AppointmentCreated', { date: appointmentDate.getTime() });
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao tentar criar o agendamento, tente novamente',
      );
    }
  }, [navigate, selectedDate, selectedHour, selectedProvider]);

  const morningAvailability = useMemo(() => {
    return dayAvailability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => ({
        hour,
        hourFormatted: `${String(hour).padStart(2, '0')}:00`,
        available,
      }));
  }, [dayAvailability]);

  const afternoonAvailability = useMemo(() => {
    return dayAvailability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => ({
        hour,
        hourFormatted: `${String(hour)}:00`,
        available,
      }));
  }, [dayAvailability]);

  useEffect(() => {
    api.get('/providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${selectedProvider}/daily-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => setDayAvailability(response.data));
  }, [selectedProvider, selectedDate]);

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </S.BackButton>

        <S.HeaderTitle>Barbeiros</S.HeaderTitle>

        <S.UserAvatar
          source={{
            uri:
              'https://avatars0.githubusercontent.com/u/59578980?s=460&u=e8c108f72a960349eeee3b6249353360e68c3325&v=4',
          }}
        />
      </S.Header>

      <ScrollView>
        <S.ProvidersListContainer>
          <S.ProvidersList
            data={providers}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(provider) => provider.id}
            renderItem={({ item: provider }) => (
              <S.ProviderContainer
                onPress={() => handleSelectProvider(provider.id)}
                selected={provider.id === selectedProvider}
              >
                <S.ProviderAvatar
                  source={{
                    uri:
                      'https://avatars0.githubusercontent.com/u/59578980?s=460&u=e8c108f72a960349eeee3b6249353360e68c3325&v=4',
                  }}
                />
                <S.ProviderName selected={provider.id === selectedProvider}>
                  {provider.name}
                </S.ProviderName>
              </S.ProviderContainer>
            )}
          />
        </S.ProvidersListContainer>
        <S.Calendar>
          <S.Title>Escolha a data</S.Title>

          <S.OpenDatePickerButton onPress={handleOpenDatePicker}>
            <S.OpenDatePickerButtonText>
              Abrir calendário
            </S.OpenDatePickerButtonText>
          </S.OpenDatePickerButton>

          {showDatePicker && (
            <DateTimePicker
              onChange={handleDateChanged}
              mode="date"
              display="calendar"
              value={selectedDate}
            />
          )}
        </S.Calendar>

        <S.Schedule>
          <S.Title>Escolha o horário</S.Title>

          <S.Section>
            <S.SectionTitle>Manhã</S.SectionTitle>

            <S.SectionContent>
              {morningAvailability.map(({ hour, hourFormatted, available }) => (
                <S.Hour
                  available={available}
                  enabled={available}
                  key={hourFormatted}
                  onPress={() => handleSelectHour(hour)}
                  selected={selectedHour === hour}
                >
                  <S.HourText selected={selectedHour === hour}>
                    {hourFormatted}
                  </S.HourText>
                </S.Hour>
              ))}
            </S.SectionContent>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Tarde</S.SectionTitle>

            <S.SectionContent>
              {afternoonAvailability.map(
                ({ hour, hourFormatted, available }) => (
                  <S.Hour
                    available={available}
                    enabled={available}
                    key={hourFormatted}
                    onPress={() => handleSelectHour(hour)}
                    selected={selectedHour === hour}
                  >
                    <S.HourText selected={selectedHour === hour}>
                      {hourFormatted}
                    </S.HourText>
                  </S.Hour>
                ),
              )}
            </S.SectionContent>
          </S.Section>
        </S.Schedule>

        <S.CreateAppointmentButton onPress={handleCreateAppointment}>
          <S.CreateAppointmentButtonText>Agendar</S.CreateAppointmentButtonText>
        </S.CreateAppointmentButton>
      </ScrollView>
    </S.Container>
  );
};

export default CreateAppointment;
