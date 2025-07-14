import { CampusInterface } from '@/interfaces/Campus';
import { TypePersionInterface } from '@/interfaces/TypePerson';

export interface LinkInterface {
  id: string;
  name: string;
  url: string;
  campus?: CampusInterface[];
  type_person?: TypePersionInterface[];
  only_in?: string;
  date_created: string;
}
