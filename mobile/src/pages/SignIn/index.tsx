import React, { useCallback, useRef } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';

import Logo from '../../assets/logo.png';

import Button from '../../components/Button';
import Input from '../../components/Input';

import * as S from './styles';

interface FormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  const { signIn } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const inputPasswordRef = useRef<TextInput>(null);

  const handleSignIn = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatóroio')
            .email('E-mail inválido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn(data);
      } catch (e) {
        if (e instanceof Yup.ValidationError) {
          const errors = getValidationErrors(e);

          formRef.current?.setErrors(errors);
        }

        console.log(e);

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, chegue as credenciais.',
        );
      }
    },
    [signIn],
  );

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

            <Form onSubmit={handleSignIn} ref={formRef}>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                icon="mail"
                keyboardType="email-address"
                name="email"
                onSubmitEditing={() => {
                  inputPasswordRef.current?.focus();
                }}
                placeholder="E-mail"
                returnKeyType="next"
              />
              <Input
                icon="lock"
                name="password"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
                placeholder="Senha"
                ref={inputPasswordRef}
                returnKeyType="send"
                secureTextEntry
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>

            <S.ForgotPassword>
              <S.ForgotPasswordText>Esqueci minha senha</S.ForgotPasswordText>
            </S.ForgotPassword>
          </S.Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <S.CreateAccount
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      >
        <Icon name="log-in" size={20} color="#ff9000" />
        <S.CreateAccountText>Criar uma conta</S.CreateAccountText>
      </S.CreateAccount>
    </>
  );
};

export default SignIn;
