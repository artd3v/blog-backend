import express from 'express';
import multer from 'multer';

import mongoose from 'mongoose';

import * as dotenv from 'dotenv';
dotenv.config();

import { registerValidation, loginValidation, postCreateValidation} from './validations.js';

import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

mongoose
    .connect(process.env.DATA_BASE)
    // .connect('mongodb+srv://Admin:r2d2y3b3f4@myclustertest.j8phnld.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB work'))
    .catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login',loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, PostController.update);

app.listen(4444, (err) => {
    if(err) {
        return console.log(err);
    }

    console.log('This server has been started on port 4444');
});