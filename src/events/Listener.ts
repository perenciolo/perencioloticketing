import { Stan, Message, SubscriptionOptions } from 'node-nats-streaming';
import { Subjects } from './Subjects';

export interface IListener {
  queueGroupName: string;
  onMessage(data: any, msg: Message): void;
}

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> implements IListener {
  private client: Stan;

  abstract queueGroupName: string;
  abstract subject: T['subject'];
  abstract onMessage(data: T['data'], msg: Message): void;

  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  public subscriptionOptions(): SubscriptionOptions {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  public listen(): void {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on('message', (msg: Message) => {
      console.log(`Message received: ${this.subject}/ ${this.queueGroupName}`);
      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message): string {
    const data = msg.getData();
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf-8'));
  }
}
