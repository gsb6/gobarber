import React, { useCallback, useRef } from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  Alert,
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
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import Button from '../../components/Button';
import Input from '../../components/Input';

import * as S from './styles';

interface FormData {
  name: string;
  email: string;
  password: string;
  old_password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const inputEmailRef = useRef<TextInput>(null);
  const inputPasswordRef = useRef<TextInput>(null);
  const inputOldPasswordRef = useRef<TextInput>(null);
  const inputConfirmPasswordRef = useRef<TextInput>(null);

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione seu avatar',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar câmera',
        chooseFromLibraryButtonTitle: 'Escolher da galeria',
      },
      (response) => {
        if (response.didCancel) return;

        if (response.error) {
          Alert.alert('Erro ao escolher avatar');
        }

        const source = { uri: response.uri };

        const formData = new FormData();

        formData.append('avatar', {
          type: 'image/jpeg',
          name: `${user.id}.jpg`,
          uri: response.uri,
        });

        api.patch('/users/avatar', formData).then((response) => {
          updateUser(response.data);
        });
      },
    );
  }, [updateUser, user.id]);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatóroio')
            .email('E-mail inválido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (value) => !!value.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (value) => !!value.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Senhas não conferem'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const payload = {
          name,
          email,
          ...(old_password
            ? { old_password, password, password_confirmation }
            : {}),
        };

        api
          .put('/profile', payload)
          .then((response) => updateUser(response.data));

        navigation.navigate('Dashboard');
      } catch (e) {
        if (e instanceof Yup.ValidationError) {
          const errors = getValidationErrors(e);

          formRef.current?.setErrors(errors);
        }

        Alert.alert(
          'Erro na atualização do perfil',
          'Ocorreu um erro ao atualizar seu perfil, tente novamente.',
        );
      }
    },
    [navigation, updateUser],
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <>
      <KeyboardAvoidingView behavior={undefined} enabled style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <S.BackButton onPress={handleGoBack}>
            <Icon name="chevron-left" size={24} color="#999591" />
          </S.BackButton>
          <S.Container>
            <S.UserAvatarButton onPress={handleUpdateAvatar}>
              <S.UserAvatar
                source={{
                  uri:
                    'https://avatars0.githubusercontent.com/u/59578980?s=460&u=e8c108f72a960349eeee3b6249353360e68c3325&v=4',
                }}
              />
            </S.UserAvatarButton>

            <View>
              <S.Title>Meu perfil</S.Title>
            </View>
            <Form initialData={user} onSubmit={handleSubmit} ref={formRef}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                onSubmitEditing={() => inputEmailRef.current?.focus()}
                placeholder="Nome"
                returnKeyType="next"
              />
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                name="email"
                keyboardType="email-address"
                icon="mail"
                onSubmitEditing={() => inputOldPasswordRef.current?.focus()}
                placeholder="E-mail"
                ref={inputEmailRef}
                returnKeyType="next"
              />
              <Input
                name="old_password"
                icon="lock"
                onSubmitEditing={() => inputPasswordRef.current?.focus()}
                ref={inputOldPasswordRef}
                placeholder="Senha atual"
                returnKeyType="next"
                secureTextEntry
              />

              <Input
                name="password"
                icon="lock"
                onSubmitEditing={() => inputConfirmPasswordRef.current?.focus()}
                ref={inputPasswordRef}
                placeholder="Nova senha"
                returnKeyType="next"
                secureTextEntry
              />

              <Input
                name="password_confirmation"
                icon="lock"
                onSubmitEditing={() => formRef.current?.submitForm()}
                ref={inputConfirmPasswordRef}
                placeholder="Confirmar senha"
                returnKeyType="send"
                secureTextEntry
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Confirmar mudanças
              </Button>
            </Form>
          </S.Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;
