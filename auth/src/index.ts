import express from 'express';
import 'express-async-errors';

import { json } from 'body-parser';
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { currentUserRouter } from './routes/current-user';
import { signoutRouter } from './routes/signout';
import { signInRouter } from './routes/signin';
import { signupRouter } from './routes/signup';

import { errorHandler } from "./middlewares/error-handler";
import {NotFoundError} from "./errors/not-found-error";

const app = express();
app.set('trust proxy', true)

app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: true,
    })
)

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async ()=> {
    throw new NotFoundError()
});

app.use(errorHandler);

const start = async() => {
    if(!process.env.JWT_KEY){
        throw new Error("JWT_KEY must be defined");
    }

    try{
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    } catch (e) {
        console.log(e);
    }
    console.log("Connected to MongoDB");
    app.listen(3000, ()=>{
        console.log('Listening on Port 3000!');
    })
};

start().then(r => console.log("App running"));
