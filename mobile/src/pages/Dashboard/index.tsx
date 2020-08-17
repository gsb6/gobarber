import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import * as S from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const { navigate } = useNavigation();
  const { signOut, user } = useAuth();

  const [providers, setProviders] = useState<Provider[]>([]);

  const navigateToProfile = useCallback(() => {
    // navigate('Profile');
    signOut();
  }, [navigate]);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate],
  );

  useEffect(() => {
    api.get('/providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle>
          Bem-vindo(a),{'\n'}
          <S.Username>{user.name}</S.Username>
        </S.HeaderTitle>
        <S.ProfileButton onPress={navigateToProfile}>
          <S.ProfileAvatar
            source={{
              uri:
                'https://avatars0.githubusercontent.com/u/59578980?s=460&u=e8c108f72a960349eeee3b6249353360e68c3325&v=4',
            }}
          />
        </S.ProfileButton>
      </S.Header>

      <S.ProvidersTitle>Barbeiros</S.ProvidersTitle>

      <S.ProvidersList
        data={providers}
        keyExtractor={(provider) => provider.id}
        renderItem={({ item: provider }) => (
          <S.ProviderContainer
            onPress={() => navigateToCreateAppointment(provider.id)}
          >
            <S.ProviderAvatar
              source={{
                uri:
                  'https://avatars0.githubusercontent.com/u/59578980?s=460&u=e8c108f72a960349eeee3b6249353360e68c3325&v=4',
              }}
            />

            <S.ProviderInfo>
              <S.ProviderName>{provider.name}</S.ProviderName>

              <S.ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000" />
                <S.ProviderMetaText>Segunda à sexta</S.ProviderMetaText>
              </S.ProviderMeta>

              <S.ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000" />
                <S.ProviderMetaText>8h às 18h</S.ProviderMetaText>
              </S.ProviderMeta>
            </S.ProviderInfo>
          </S.ProviderContainer>
        )}
      ></S.ProvidersList>
    </S.Container>
  );
};

export default Dashboard;
