import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateComment } from './dtos/create-comment.dto';
import { GetCurrentUser } from '../auth/decorators';

@Controller('comment')
export class CommentController {
  constructor(
    private commentService: CommentService,
  ) {}

  @Get()
  getComment(
    @Query('postSlug') postSlug: string,
  ) {
    return this.commentService.getComment(
      postSlug,
    );
  }

  // create a comment
  @Post()
  createComment(
    @Body() body: CreateComment,
    @GetCurrentUser('email')
    userEmail: string,
  ) {
    return this.commentService.createComment(
      body.content,
      body.postSlug,
      userEmail,
    );
  }

  @Patch(':id')
  editCommentById(
    @GetCurrentUser('email') userEmail: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateComment,
  ) {
    return this.commentService.editCommentById(
      userEmail,
      id,
      body.content,
    );
  }

  @Delete(':id')
  deleteCommentById(
    @GetCurrentUser('email') userEmail: string,
    @Param('id', ParseIntPipe) commentId: number,
  ) {
    return this.commentService.deleteCommentById(
      userEmail,
      commentId,
    );
  }
}
