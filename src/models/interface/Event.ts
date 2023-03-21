import { CategoryType } from './Category';
import { ChildrenType } from './Children';
import { UserType } from './User';

export interface EventType {
  id: string;
  name: string;
  address: string;
  postalCode: string;
  city: string;
  // date: SVGStringList;
  date: string;
  time: string;
  description: string;
  category: CategoryType;
  participants: ChildrenType[];
}
