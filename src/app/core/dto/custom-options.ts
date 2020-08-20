/**
 * proyecto: Tabito Promociones
 * date:    17-08-2020
 * author:  Alvaro Merlo
 **/
import {NotifierNotificationOptions} from "angular-notifier/lib/models/notifier-notification.model";


export interface CustomOptions extends NotifierNotificationOptions {
  tile: string;
}
