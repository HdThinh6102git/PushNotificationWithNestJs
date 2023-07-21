import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { NotificationModule } from './notification/notification.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notifications } from './notification/entities/notification.entity';
import {NotificationToken} from "./notification/entities/notification-token.entity";
import {User} from "./users/entities/users.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Hdt6102@',
      database: 'in_app_notification',
      entities: [Notifications, NotificationToken,User],
      synchronize: true,
    }),
    UsersModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
