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
    body('title', 'Неверный формат почты').isString({ min: 3 }),
    body('text', 'Пароль должен содержать минимум 6 символов').isString({ min: 15 }),
    body('tags', 'Укажите Ваше имя').optional().isArray(),
    body('imageUrl', 'Неправильный URL адрес').optional().isString(),
];