import { Subjects} from "./subjects";

export interface TicketCreatedEvent {
    subject: Subjects.TicketCreated,
    data: {
        id: String;
        title: string;
        price: number;
    };
}