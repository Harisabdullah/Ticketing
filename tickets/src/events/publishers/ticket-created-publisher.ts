import { Publisher, Subjects, TicketCreatedEvent } from "@bk_tickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}