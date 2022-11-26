import { body } from 'express-validator';


export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен содержать минимум 6 символов').isLength({ min: 6 }),
];

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен содержать минимум 6 символов').isLength({ min: 6 }),
    body('fullName', 'Укажите Ваше имя').isLength({ min: 3 }),
    body('avatarUrl', 'Неправильный URL адрес').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Неверный формат почты')({ min: 3 }).isString(),
    body('text', 'Пароль должен содержать минимум 6 символов')({ min: 15 }).isString(),
    body('tags', 'Укажите Ваше имя').optional().isArray(),
    body('imageUrl', 'Неправильный URL адрес').optional().isString(),
];