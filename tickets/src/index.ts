import 'express-async-errors';
import mongoose from "mongoose";
import {NotFoundError, errorHandler } from "@bk_tickets/common";

import { app } from './app';

app.all('*', async ()=> {
    throw new NotFoundError()
});

app.use(errorHandler);

const start = async() => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }

    try{
        await mongoose.connect(process.env.MONGO_URI);
    } catch (e) {
        console.log(e);
    }
    console.log("Connected to MongoDB");
    app.listen(3000, ()=>{
        console.log('Listening on Port 3000!');
    })
};

start().then(() => console.log("App running"));
