import { Address } from "./address";
import { Amenity } from "./amenity";
import { Person } from "./person";

export interface Accommodation {
    id?: number;
    name: string;
    phoneNumber?: string;
    mainPagePicture?: string;
    description?: string;
    city: string;
    address?: Address;
    rooms?: [];
    amenities?: Amenity[];
    person?: Person;
}