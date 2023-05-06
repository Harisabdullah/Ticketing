import request from "supertest";
import { app } from "../../app"
import exp from "constants";

it('returns a ticket if the ticket is found', async () => {
    const title = 'Concert';
    const price = 20;

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', signin())
        .send({
            title,
            price
        })
        .expect(201);

    await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .set('Cookie', signin())
        .send()
        .expect(200);

    expect(response.body.title).toEqual(title);
    expect(response.body.price).toEqual(price);
});

it('returns a status of 404 if ticket is not found', async () => {
    await request(app)
        .get('/api/tickets/5c88fa8cf4afda39709c2955')
        .send()
        .expect(404);
});

