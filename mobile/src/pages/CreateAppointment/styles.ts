import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { Provider } from './index';

interface ProviderContainerProps {
  selected: boolean;
}

interface ProviderNameProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #28262e;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  margin-left: 16px;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  color: #f4ede8;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-left: auto;
`;

export const ProvidersListContainer = styled.View`
  height: 112px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px;
`;

export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
  margin-right: 16px;
  padding: 8px 12px;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  background: ${({ selected }) => (selected ? '#ff9000' : '#3e3b47')};
`;

export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const ProviderName = styled.Text<ProviderNameProps>`
  margin-left: 8px;
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: ${({ selected }) => (selected ? '#232129' : '#f4ede8')};
`;

export const Calendar = styled.View``;

export const Title = styled.Text`
  margin: 0 24px 24px;
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
  color: #f4ede8;
`;

export const OpenDatePickerButton = styled(RectButton)`
  height: 46px;
  margin: 0 24px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background: #ff9900;
`;

export const OpenDatePickerButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #232129;
`;

export const Schedule = styled.View`
  padding: 24px 0 16px;
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.Text`
  margin: 0 24px 12px;
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  color: #999591;
`;

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const Hour = styled(RectButton)<HourProps>`
  margin-right: 8px;
  padding: 12px;
  border-radius: 10px;
  background: ${({ selected }) => (selected ? '#ff9000' : '#3e3b47')};
  opacity: ${({ available }) => (available ? 1 : 0.3)};
`;

export const HourText = styled.Text<HourTextProps>`
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  color: ${({ selected }) => (selected ? '#232129' : '#f4ede8')};
`;

export const CreateAppointmentButton = styled(RectButton)`
  height: 50px;
  margin: 0 24px 24px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background: #ff9900;
`;

export const CreateAppointmentButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #232129;
`;
