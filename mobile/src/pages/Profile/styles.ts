import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px 160px;
`;

export const Title = styled.Text`
  margin: 24px 0;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  color: #f4efe8;
`;

export const BackButton = styled.TouchableOpacity`
  margin: 24px;
`;

export const UserAvatarButton = styled(RectButton)`
  margin-top: 64px;
  align-self: center;
`;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
`;
