import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { Provider } from './index';

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

export const HeaderTitle = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 20px;
  line-height: 28px;
  color: #f4ede8;
`;

export const Username = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #ff9000;
`;

export const ProfileButton = styled.TouchableOpacity``;

export const ProfileAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const ProvidersTitle = styled.Text`
  margin: 16px 0 0 24px;
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
  color: #f4ede8;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px 16px;
`;

export const ProviderContainer = styled(RectButton)`
  margin-bottom: 16px;
  padding: 20px;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  background: #3e3b47;
`;

export const ProviderAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;

export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProviderName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #f4ede8;
`;

export const ProviderMeta = styled.View`
  margin-top: 8px;
  flex-direction: row;
  align-items: center;
`;

export const ProviderMetaText = styled.Text`
  margin-left: 8px;
  font-family: 'RobotoSlab-Regular';
  color: #999591;
`;
