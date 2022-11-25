import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен содержать минимум 6 символов').isLength({ min: 6 }),
    body('fullName', 'Укажите Ваше имя').isLength({ min: 3 }),
    body('avatarUrl', 'Неправильный URL адрес').optional().isURL(),
];