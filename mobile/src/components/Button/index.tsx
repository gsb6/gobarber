import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import { View } from 'react-native';

import * as S from './styles';

interface Props extends RectButtonProperties {
  children: string;
}

const Button: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <S.Container {...rest}>
      <S.Label>{children}</S.Label>
    </S.Container>
  );
};

export default Button;
