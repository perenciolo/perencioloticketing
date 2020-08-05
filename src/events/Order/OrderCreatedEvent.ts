import { Subjects } from '../Subjects';
import { OrderStatus } from '../types/OrderStatus';

export interface OrderCreatedEvent {
  readonly subject: Subjects.OrderCreated;
  data: {
    id: string;
    status: OrderStatus;
    userId: string;
    expiresAt: string;
    ticket: {
      id: string;
      price: number;
    };
  };
}
