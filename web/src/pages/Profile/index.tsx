import React, { useCallback, useRef, ChangeEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiLock, FiMail, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import * as Yup from 'yup';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import Button from '../../components/Button';
import Input from '../../components/Input';

import * as S from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();

  const handleAvatarChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return;

      const formData = new FormData();

      formData.append('avatar', event.target.files[0]);

      api.patch('/users/avatar', formData).then((response) => {
        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Seu avatar foi atualizado.',
        });
      });
    },
    [addToast, updateUser],
  );

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
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

        addToast({
          type: 'success',
          title: 'Seu perfil foi atualizado!',
        });

        history.push('/dashboard');
      } catch (e) {
        if (e instanceof Yup.ValidationError) {
          const errors = getValidationErrors(e);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização do perfil',
          description:
            'Ocorreu um erro ao atualizar seu perfil, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <S.Container>
      <S.Header>
        <Link to="/dashboard">
          <FiArrowLeft />
        </Link>
      </S.Header>
      <S.Content>
        <Form
          initialData={{ name: user.name, email: user.email }}
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <S.Avatar>
            <img
              src="https://avatars1.githubusercontent.com/u/59578980?s=460&u=5824ad2edf97f9b4c6ce9039b20e432c00d42230&v=4"
              alt={user.name}
            />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </S.Avatar>

          <h1>Meu perfil</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input
            name="old_password"
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
          />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Nova senha"
          />
          <Input
            name="password_confirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmar senha"
          />
          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </S.Content>
    </S.Container>
  );
};

export default Profile;
