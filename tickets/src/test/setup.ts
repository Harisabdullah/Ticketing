import request from "supertest";

import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'

declare global {
    var signin: () => string[];
}

let mongo: any;
beforeAll(async() => {
    process.env.JWT_KEY = 'asdf';
    const mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri, {});
})

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for(let collection of collections){
        await collection.deleteMany({});
    }
})

afterAll(async () => {
    await mongoose.connection.close();
    await mongo?.stop();

})

global.signin = () => {
    // build a jwt payload { id, email }
    const id = new mongoose.Types.ObjectId().toHexString();
    const payload = {
        id,
        email: "fake@fake.com",

    }
    // create JWT
    const token = jwt.sign(payload,process.env.JWT_KEY! );

    // Build session Object { jwt: MY_JWT }
    const session = { jwt: token };

    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session);

    // Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    // return a string (cookie)
    return [`session=${base64}`];
}