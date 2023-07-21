import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/users.entity";
import {Repository} from "typeorm";
import {NotificationService} from "../notification/notification.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {NotificationDto} from "../notification/dto/create-notification.dto";
import {UpdateNotificationDto} from "../notification/dto/update-notification.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly notificationService: NotificationService,
    ) {}
    create(user: CreateUserDto): Promise<User> {
        return this.userRepository.save(user);
    }
    updateProfile = async (user_id: number, update_dto: any): Promise<any> => {
        try {
            const user = await this.userRepository.findOne({
                where: { id: user_id },
            });
            const updated_user = {
                ...user,
                username: update_dto.username,
                email: update_dto.email,
            }
            const saved_user = await this.userRepository.save(updated_user);
            if (saved_user) {
                // send push notification
                await this.notificationService.sendPush(
                    updated_user,
                    'Profiie update',
                    'Your Profile have been updated successfully',
                )
                    .catch((e) => {
                        console.log('Error sending push notification', e);
                    });
            }
            return saved_user;
        } catch (error) {
            return error;
        }
    }
    enablePush = async (
        user_id: number,
        update_dto: NotificationDto,
    ): Promise<any> => {
        const user = await this.userRepository.findOne({
            where: { id: user_id },
        });
        return await this.notificationService.acceptPushNotification(
            user,
            update_dto,
        );
    };
    disablePush = async (
        user_id: number,
        update_dto: UpdateNotificationDto,
    ): Promise<any> => {
        const user = await this.userRepository.findOne({
            where: { id: user_id },
        });
        return await this.notificationService.disablePushNotification(
            user,
            update_dto,
        );
    };
    getPushNotifications = async (): Promise<any> => {
        return await this.notificationService.getNotifications();
    };
}
