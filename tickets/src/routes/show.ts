import express, {Request, Response} from 'express';
import { Ticket } from '../models/tickets';
import {NotFoundError} from "@bk_tickets/common";

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const tickets = await Ticket.findById(id);
    if(!tickets){
        throw new NotFoundError();
    }
    res.send(tickets);
});

export { router as showTicketRouter };