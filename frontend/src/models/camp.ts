import { Service } from './service';
import { User } from './user';

// Defining the Camp interface
export interface Camp {
    _id: string;
    campName: string;
    campType: string;
    date: string;
    description: string;
    address: string;
    offeredBy: string | null;
    volunteers: User[];
    servicesOffered: Service[];
  }