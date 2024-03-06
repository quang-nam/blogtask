import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { PrismaModule } from './databases/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './modules/auth/guards';
import { ConfigModule } from '@nestjs/config';
import { CategoryService } from './modules/category/category.service';
import { PostModule } from './modules/post/post.module';
import { PostService } from './modules/post/post.service';
import { CommentService } from './modules/comment/comment.service';
import { CommentModule } from './modules/comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    CategoryModule,
    PrismaModule,
    PostModule,
    CommentModule,
  ],
  controllers: [],
  providers: [
    // write here because not support dependency injection in global
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    CategoryService,
    PostService,
    CommentService,
  ],
})
export class AppModule {}
