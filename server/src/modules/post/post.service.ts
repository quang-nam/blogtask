import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/databases/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getPost(page: number, cat: string) {
    const POST_PER_PAGE = 2;
    const query = {
      take: POST_PER_PAGE,
      skip: POST_PER_PAGE * (page - 1),
      where: {
        ...(cat && { catSlug: cat }),
      },
    };
    const [posts, count] =
      await this.prisma.$transaction([
        this.prisma.post.findMany(query),
        this.prisma.post.count({
          where: query.where,
        }),
      ]);
    return { posts, count };
  }

  async updatePost(id: number) {
    return this.prisma.post.update({
      where: { id },
      data: {
        views: { increment: 1 },
      },
      include: { author: true },
    });
  }

  async createPost(body: any, authorId: number) {
    const post = await this.prisma.post.create({
      data: {
        ...body,
        authorId,
      },
    });
    return post;
  }

  // get all post
  async getAllPost() {
    const posts =
      await this.prisma.post.findMany();
    return posts;
  }

  // delete post
  async deletePost(postId: number) {
    const post = await this.prisma.post.delete({
      where: { id: postId },
    });
    if (post) {
      return {
        message: 'Post deleted successfully',
      };
    }
  }
}
