import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { GetCurrentUserId } from '../auth/decorators';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/admin')
  @UseGuards(AdminGuard)
  getAllPost() {
    return this.postService.getAllPost();
  }
  @Get()
  getPost(
    @Query('page', ParseIntPipe) page: number,
    @Query('category') cat: string,
  ) {
    return this.postService.getPost(
      page || 1,
      cat,
    );
  }

  @Get(':id')
  getPostById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.postService.updatePost(id);
  }

  @Post()
  createPost(
    @Body() body: any,
    @GetCurrentUserId() currentUserId: number,
  ) {
    return this.postService.createPost(
      body,
      currentUserId,
    );
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  deletePost(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.postService.deletePost(id);
  }
}
