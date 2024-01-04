import { AppDataSource } from '@/db/data-source';
import { UserEntity } from './user.entity';

export const userModel = AppDataSource.getRepository(UserEntity);
