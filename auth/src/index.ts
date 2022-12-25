import 'express-async-errors';
import mongoose from "mongoose";

import { app } from './app';

import { currentUserRouter } from './routes/current-user';
import { signoutRouter } from './routes/signout';
import { signInRouter } from './routes/signin';
import { signupRouter } from './routes/signup';

import { errorHandler } from "./middlewares/error-handler";
import {NotFoundError} from "./errors/not-found-error";


app.use(currentUserRouter);
app.use(signInRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async ()=> {
    throw new NotFoundError()
});

app.use(errorHandler);

const start = async() => {
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

start().then(() => console.log("App running"));
