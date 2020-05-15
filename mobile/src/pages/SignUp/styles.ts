import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px 160px;
`;

export const Title = styled.Text`
  margin: 64px 0 24px;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  color: #f4efe8;
`;

export const BackToSignIn = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 16px 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top-width: 1px;
  border-color: #232129;
`;

export const BackToSignInText = styled.Text`
  margin-left: 16px;
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  color: #f4efe8;
`;
