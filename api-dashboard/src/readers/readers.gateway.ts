import { faker } from '@faker-js/faker';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'readers',
})
export class ReadersGateway {
  @WebSocketServer()
  server: Server;

  afterInit() {
    setInterval(this.emitRandomEvent.bind(this), 30000);
  }

  emitRandomEvent() {
    const randomEmployeeName = faker.name.fullName();
    const randomEventName: 'ENTRY' | 'EXIT' = faker.helpers.arrayElement([
      'ENTRY',
      'EXIT',
    ]);

    if (randomEventName === 'ENTRY') {
      this.emitEntryEvent(randomEmployeeName);
    }

    if (randomEventName === 'EXIT') {
      this.emitExitEvent(randomEmployeeName);
    }
  }

  emitEntryEvent(employeeName: string) {
    this.server.emit('ENTRY', employeeName);
  }

  emitExitEvent(employeeName: string) {
    this.server.emit('EXIT', employeeName);
  }

  @SubscribeMessage('MANUAL_READ')
  handleMessage(
    @MessageBody()
    body: {
      employeeName: string;
      eventName: 'ENTRY' | 'EXIT';
    },
  ) {
    if (body.eventName === 'ENTRY') {
      this.emitEntryEvent(body.employeeName);
    }

    if (body.eventName === 'EXIT') {
      this.emitExitEvent(body.employeeName);
    }
  }
}
