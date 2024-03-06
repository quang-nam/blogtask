import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import {
  AtStrategy,
  RtStrategy,
} from './strategies';
import { JwtModule } from '@nestjs/jwt';

@Module({
  // nhập jwt module để sử dụng trong auth service
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    AtStrategy,
    RtStrategy,
  ],
  exports: [],
})
export class AuthModule {}
