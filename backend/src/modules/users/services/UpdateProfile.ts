import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsers';
import IHashProvider from '../providers/hash/models/IHashProvider';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userWithExistingEmail = await this.usersRepository.findByEmail(email);

    if (userWithExistingEmail && userWithExistingEmail.id !== user_id) {
      throw new AppError('Email already is use.');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError('Old password is needed to set a new password.');
    }

    if (password && old_password) {
      const checkold_password = await this.hashProvider.compare(
        old_password,
        user.password,
      );

      if (!checkold_password) {
        throw new AppError('Old password does not match.');
      }

      user.password = await this.hashProvider.generate(password);
    }

    return this.usersRepository.save(user);
  }
}
