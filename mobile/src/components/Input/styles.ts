import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  width: 100%;
  height: 60px;
  margin-bottom: 10px;
  padding: 0 16px;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  background: #232129;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  color: #fff;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
