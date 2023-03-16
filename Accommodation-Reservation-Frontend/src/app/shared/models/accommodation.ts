import { Address } from "./address";
import { Amenity } from "./amenity";
import { Person } from "./person";
import { Room } from "./room";

export interface Accommodation {
    id?: number;
    name: string;
    phoneNumber?: string;
    mainPagePicture?: string;
    description?: string;
    city: string;
    address?: Address;
    rooms?: Room[];
    amenities?: Amenity[];
    person?: Person;
}