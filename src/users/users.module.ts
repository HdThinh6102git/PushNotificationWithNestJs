import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationModule } from '../notification/notification.module';
import { User } from './entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), NotificationModule,],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
