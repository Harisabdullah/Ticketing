import { Publisher, Subjects, TicketUpdatedEvent } from "@bk_tickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    readonly subject = Subjects.TicketUpdated;
}