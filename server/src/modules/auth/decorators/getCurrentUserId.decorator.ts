import {
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { JwtPayload } from '../type';

export const GetCurrentUserId =
  createParamDecorator(
    (
      data: never,
      context: ExecutionContext,
    ): number => {
      const request = context
        .switchToHttp()
        .getRequest();
      const user = request.user as JwtPayload;
      return user.sub;
    },
  );
