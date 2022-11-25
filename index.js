import express from 'express';
import mongoose from 'mongoose';

import dotenv from 'dotenv';

import { registerValidation } from './validations/auth.js';

import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';


mongoose
    .connect('mongodb+srv://Admin:r2d2y3b3f4@myclustertest.j8phnld.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB work'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());


app.post('/auth/login', UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);


app.listen(4444, (err) => {
    if(err) {
        return console.log(err);
    }

    console.log('This server has been started on port 4444');
});