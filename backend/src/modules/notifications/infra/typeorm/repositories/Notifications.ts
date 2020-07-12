import { getMongoRepository, MongoRepository } from 'typeorm';

import Notification from '../schemas/Notification';
import INotificationsRepository from '@modules/notifications/repositories/INotifications';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotification';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create(
    notification: ICreateNotificationDTO,
  ): Promise<Notification> {
    const newNotification = this.ormRepository.create(notification);

    await this.ormRepository.save(newNotification);

    return newNotification;
  }
}

export default NotificationsRepository;
