import { Accommodation } from "./accommodation";

export interface Room {
    id?: number;
    name?: string;
    roomImage?: string;
    pricePerNight?: number;
    size?: number;
    description?: string;
    bedSize?: number;
    accommodation?: Accommodation;
}