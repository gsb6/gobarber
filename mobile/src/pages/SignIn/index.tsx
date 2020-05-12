import React from 'react';
import { Image, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Logo from '../../assets/logo.png';

import Button from '../../components/Button';
import Input from '../../components/Input';

import * as S from './styles';

const SignIn: React.FC = () => {
  return (
    <>
      <KeyboardAvoidingView behavior={undefined} enabled style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <S.Container>
            <Image source={Logo} />

            <View>
              <S.Title>Faça seu logon</S.Title>
            </View>

            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />

            <Button>Entrar</Button>

            <S.ForgotPassword>
              <S.ForgotPasswordText>Esqueci minha senha</S.ForgotPasswordText>
            </S.ForgotPassword>
          </S.Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <S.CreateAccount>
        <Icon name="log-in" size={20} color="#ff9000" />
        <S.CreateAccountText>Criar uma conta</S.CreateAccountText>
      </S.CreateAccount>
    </>
  );
};

export default SignIn;
