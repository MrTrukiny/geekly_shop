import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserEntity } from '@/user/user.entity';
import usersData from '../data/users.json';
import { encryptPassword } from '@/auth/auth.helpers';

export class SeedUsers1704143278808 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(UserEntity);

    console.info('Seeding users...');
    for (const user of usersData) {
      const newUser = userRepository.create({ ...user, password: await encryptPassword(user.password) });
      await userRepository.save(newUser);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
