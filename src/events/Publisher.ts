import { Stan } from 'node-nats-streaming';

import { Subjects } from './Subjects';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  private client: Stan;

  abstract readonly subject: T['subject'];

  constructor(client: Stan) {
    this.client = client;
  }

  public publish(data: T['data']): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          return reject(err);
        }
        console.log('Event published to subject', this.subject);
        resolve();
      });
    });
  }
}
