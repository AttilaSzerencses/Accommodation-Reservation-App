import { Address } from "./address";
import { Amenity } from "./amenity";
import { Person } from "./person";
import { Room } from "./room";

export interface Accommodation {
    id?: number;
    name: string;
    status?: string;
    phoneNumber?: string;
    mainPagePicture?: string;
    secondImage?: string;
    thirdImage?: string;
    description?: string;
    checkInDescriptionForEmail?: string;
    city: string;
    address?: Address;
    rooms?: Room[];
    amenities?: Amenity[];
    person?: Person;
}