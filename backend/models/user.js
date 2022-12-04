import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { UnauthorizedError } from '../errors/index.js';
import { schemaAvatar, schemaEmail } from '../validators/users.js';

const userSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    minLength: 2, // минимальная длина имени — 2 символа
    maxLength: 30, // а максимальная — 30 символов
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String, // тип — String
    minLength: 2, // минимальная длина имени — 2 символа
    maxLength: 30, // а максимальная — 30 символов
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (value) => !schemaAvatar.validate(value).error,
      message: () => 'Аватар должен быть http(s)-URL',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => !schemaEmail.validate(value).error,
      message: () => 'Почта должна быть вида a@b.c',
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    select: false,
  },
}, {
  versionKey: false,
  statics: {
    findOneAndValidatePassword({ password, email }) {
      return this.findOne({ email })
        .select('+password')
        .then((document) => {
          if (!document) {
            throw new UnauthorizedError('Неправильный логин или пароль');
          }

          return bcrypt.compare(password, document.password)
            .then((isSuccess) => {
              if (!isSuccess) {
                throw new UnauthorizedError('Неправильный логин или пароль');
              }

              const {
                password: removed, // удаляем пароль из объекта пользователя
                ...user
              } = document.toObject(); // превращаем документ в объект пользователя
              return user;
            });
        });
    },
  },
});

export const User = mongoose.model('user', userSchema);
