import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import exp from "constants";

it('returns a 404 if the provided ticket does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'Valid title',
            price: 20
        })
        .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'Valid title',
            price: 20
        })
        .expect(401);
});

it('returns a 401 if user does not own the ticket', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'A valid title',
            price: 3
        });

    const ticketId = response.body.id;
    const updatedTicket = {
        title: 'Updated Title',
        price: 10
    }
    await request(app)
        .put(`/api/tickets/${ticketId}`)
        .set('Cookie', global.signin())
        .send(updatedTicket)
        .expect(401);

    const ticket = await request(app)
        .get(`/api/tickets/${ticketId}`)
        .set('Cookie', global.signin())
        .send({});

    expect(ticket.body.title).not.toEqual(updatedTicket.title);
    expect(ticket.body.price).not.toEqual(updatedTicket.price);
});

it('returns a 400 if the user provides an invalid title or price', async () => {

});

it('updates the ticket provided valid inputs', async () => {

});




