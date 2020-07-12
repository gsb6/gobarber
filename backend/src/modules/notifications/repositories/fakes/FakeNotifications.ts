import { ObjectID } from 'mongodb';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import INotificationsRepository from '../INotifications';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotification';

class NotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    recipient_id,
    content,
  }: ICreateNotificationDTO): Promise<Notification> {
    const newNotification = new Notification();

    Object.assign({
      id: new ObjectID(),
      recipient_id,
      content,
    });

    this.notifications.push(newNotification);

    return newNotification;
  }
}

export default NotificationsRepository;
