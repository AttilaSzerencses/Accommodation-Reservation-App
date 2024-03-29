import { Address } from "./address";

export interface Person {
    id?: number;
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    email: string;
    phone?: string;
    role?: string;
    activated?: boolean;
    own_accommodation_id?: number;
    address?: Address;
}