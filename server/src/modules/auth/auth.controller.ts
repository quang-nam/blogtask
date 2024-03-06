import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from './decorators';
import { AuthDto } from './dtos';
import { AtGuard, RtGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('/signin')
  signin(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signin(dto, res);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @UseGuards(RtGuard)
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  refreshToken(
    @GetCurrentUser('sub') userId: number,
    @Req() request: Request,
  ) {
    return this.authService.refreshToken(
      userId,
      request.cookies['refresh_token'],
    );
  }

  // userid take from token

  @HttpCode(HttpStatus.OK)
  @UseGuards(AtGuard)
  @Post('/logout')
  logout(@GetCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }
}
