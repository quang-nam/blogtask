import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/databases/prisma/prisma.service';
import { CreateComment } from './dtos/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async getComment(postSlug: string) {
    const comment =
      await this.prisma.comment.findMany({
        where: {
          ...(postSlug && { postSlug }),
        },
        include: { user: true },
      });
    return comment;
  }

  async createComment(
    content: string,
    postSlug: string,
    userEmail: string,
  ) {
    const comment =
      await this.prisma.comment.create({
        data: {
          desc: content,
          postSlug: postSlug,
          userEmail: userEmail,
        },
      });
    return comment;
  }

  async editCommentById(
    userEmail: string,
    id: number,
    content: string,
  ) {
    const comment =
      await this.prisma.comment.findUnique({
        where: {
          id,
        },
      });
    if (
      !comment ||
      comment.userEmail !== userEmail
    ) {
      throw new ForbiddenException(
        'Access to resources is denied',
      );
    }
    const updatedComment =
      await this.prisma.comment.update({
        where: {
          id,
        },
        data: {
          desc: content,
        },
      });
    return updatedComment;
  }

  // delete comment by id
  async deleteCommentById(
    userEmail: string,
    commentId: number,
  ) {
    // still find to controll the access
    const comment =
      await this.prisma.comment.findUnique({
        where: {
          id: commentId,
        },
      });
    if (
      !comment ||
      comment.userEmail !== userEmail
    ) {
      throw new ForbiddenException(
        'Access to resources is denied',
      );
    }
    await this.prisma.comment.delete({
      where: { id: commentId },
    });
  }
}
