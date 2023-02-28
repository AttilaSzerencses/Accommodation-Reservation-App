import { Person } from "./person";
import { Room } from "./room";

export interface Reservation {
    id?: number;
    person?: Person;
    room?: Room;
    checkinDate?: string;
    checkoutDate?: string;
}