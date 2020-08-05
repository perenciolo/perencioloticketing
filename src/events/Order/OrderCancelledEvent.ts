import { Subjects } from '../Subjects';

export interface OrderCancelledEvent {
  readonly subject: Subjects.OrderCancelled;
  data: {
    id: string;
    ticket: {
      id: string;
    };
  };
}
