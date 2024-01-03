import { MigrationInterface, QueryRunner } from 'typeorm';
import { ProductEntity } from '@/product/product.entity';
import { UserEntity } from '@/user/user.entity';
import productSeedData from '../data/products.json';

export class SeedProducts1704143891690 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const productRepository = queryRunner.manager.getRepository(ProductEntity);
    const userRepository = queryRunner.manager.getRepository(UserEntity);

    // The user with ID 1 is the admin user created by the seed-users migration
    const user = await userRepository.findOneBy({ id: 1 });

    if (!user) {
      throw new Error('User with ID 1 not found');
    }

    console.info('Seeding products...');
    for (const productData of productSeedData) {
      const product = productRepository.create({
        ...productData,
        createdBy: user,
      });
      await productRepository.save(product);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
