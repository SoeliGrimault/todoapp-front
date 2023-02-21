import { EventType } from './Event';
import { UserType } from './User';

export interface ChildrenType {
  id: string;
  name: string;
  parent: UserType;
  documents: DocumentType[];
  events: EventType[];
}
