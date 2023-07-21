import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUserDto} from "./dto/create-user.dto";
import {NotificationDto} from "../notification/dto/create-notification.dto";
import {UpdateNotificationDto} from "../notification/dto/update-notification.dto";

@Controller('users')
export class UsersController {
  constructor(
      private readonly usersService: UsersService,
  ) {}
  @Post()
  @HttpCode(HttpStatus.OK)
  async CreateUser(@Body() user: CreateUserDto) {
    return await this.usersService.create(user);
  }
  @Put()
  @HttpCode(HttpStatus.OK)
  async updateProfile(
      @Body() update_dto: any,
      @Param('id') user_id: number,
  ) {
    return await this.usersService.updateProfile(user_id ,update_dto);
  }
  @Put(':id/push/enable')
  @HttpCode(HttpStatus.OK)
  async enablePush(
      @Body() update_dto: NotificationDto,
      @Param('id') user_id: number,
  ) {
    return await this.usersService.enablePush(user_id, update_dto)
  }
  @Put('push/disable')
  @HttpCode(HttpStatus.OK)
  async disablePush(
      @Param('id') user_id: number,
      @Body() update_dto: UpdateNotificationDto,
  ) {
    return await this.usersService.disablePush(user_id, update_dto)
  }
  @Get('push/notifications')
  @HttpCode(HttpStatus.OK)
  async fetchPusNotifications() {
    return await this.usersService.getPushNotifications();
  }
}
