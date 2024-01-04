import { AppDataSource } from '@/db/data-source';
import { ProductEntity } from './product.entity';

export const productModel = AppDataSource.getRepository(ProductEntity);
