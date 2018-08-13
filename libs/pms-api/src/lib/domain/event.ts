import { User } from './user';
export class Event {
  id: number;
  actor: User;
  event: string;
  createdAt: Date;
  // ...
  // 参考 https://developer.github.com/v3/issues/events/
}
