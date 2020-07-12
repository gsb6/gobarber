import ICreateNotificationDTO from '../dtos/ICreateNotification';
import Notification from '../typeorm/schemas/Notification';

export default interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}
