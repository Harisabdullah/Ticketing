// import mongoose from "mongoose";
import express, {Request, Response} from "express";
import {BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest} from "@bk_tickets/common";
import {body} from "express-validator";
import {Ticket} from "../models/ticket";
import {Order} from "../models/order";

const router = express();


router.post(
    '/api/orders',
    requireAuth,
    [
        body('ticketId')
            .not()
            .isEmpty()
            // .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
            // The above step assumes the database used by Ticket service
            // we are slightly coupling both services which ca pose a problem
            // in the future
            .withMessage('TicketId must be provided')
    ],
    validateRequest,
    async ( req: Request, res: Response) => {
        const { ticketId } = req.body;

        // find the ticket
        const ticket = await Ticket.findById(ticketId);
        if(!ticket) {
            throw new NotFoundError();
        }

        // Make sure that this ticket has not been reserved
        const isReserved = await ticket.isReserved();
        if(isReserved){
            throw new BadRequestError('Ticket is already reserved');
        }

        // Calculate the expiration date for this order
        const expiration = new Date();
        expiration.setSeconds(expiration.getSeconds() + Number(process.env.EXPIRATION_WINDOW_SECONDS));

        // Build the order and save it
        const order = Order.build({
            userId: req.currentUser!.id,
            status: OrderStatus.Created,
            expiresAt: expiration,
            ticket: ticket
        })

        await order.save();

        // TODO: Publish the event

        // Send back the order
        res.status(201).send(order);
    }
);

export { router as createOrderRouter };