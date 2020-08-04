export enum OrderStatus {
  Created = 'created', // When the order has ben created, but the ticket is trying to order has not been reserved
  Cancelled = 'cancelled', // The ticket the order is trying to reserve has already been reserved, or when the user has cancelled the order
  AwaitingPayment = 'awaiting:payment', // The order has successfully reserved the ticket
  Complete = 'complete', // The order has reserved the ticket and the user has provided payment successfully
}
