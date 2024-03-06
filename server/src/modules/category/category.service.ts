import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/databases/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getCategory() {
    const categories =
      await this.prisma.category.findMany();
    return categories;
  }
}
