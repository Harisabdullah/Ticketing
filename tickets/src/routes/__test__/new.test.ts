import request from "supertest";

import { app } from "../../app";
import {Ticket} from "../../models/tickets";
import {natsWrapper} from "../../nats-wrapper";

it('has a route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({});

    expect(response.status).not.toEqual(404);
});

it('can NOT be accessed if the user is not signed in', async () => {
    await request(app).post('/api/tickets').send({}).expect(401);
});

it('can be accessed if the user is signed in', async () => {
   const response = await request(app)
       .post('/api/tickets')
       .set('Cookie', signin())
       .send({})

    expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', signin())
        .send({
            title: '',
            price: 10
        })
        .expect(400);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', signin())
        .send({
            price: 10
        })
        .expect(400);
});

it('returns an error if an invalid price is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', signin())
        .send({
            title: 'A Good Title',
            price: -10
        })
        .expect(400);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', signin())
        .send({
            title: 'A Good Title'
        })
        .expect(400);
});

it('creates a ticket with valid inputs', async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const title = 'A valid test title';
    const price = 10;

    await request(app)
        .post('/api/tickets')
        .set('Cookie', signin())
        .send({ title, price })

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].title).toEqual(title);
    expect(tickets[0].price).toEqual(price);
});

it('publishes an event', async () => {
    const title = 'A valid test title';
    const price = 10;

    await request(app)
        .post('/api/tickets')
        .set('Cookie', signin())
        .send({ title, price })
        .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});