import { Person } from "./person";
import { Room } from "./room";

export interface Reservation {
    id?: number;
    price?: number;
    reservationDate?: string;
    person?: Person;
    room?: Room;
    checkinDate?: string;
    checkoutDate?: string;
}