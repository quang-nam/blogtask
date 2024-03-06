import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import {
  JwtPayload,
  JwtPayloadwithRt,
} from '../type';
import config from 'src/configs';

export class RtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest:
        // ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromExtractors([
          (req: Request) => {
            return req.cookies['refresh_token'];
          },
        ]),
      secretOrKey: config.jwt.rtsecret,
      passReqToCallback: true,
    });
  }
  validate(
    req: Request,
    payload: JwtPayload,
  ): JwtPayloadwithRt {
    // const refreshToken = req
    // ?.get('authorization')
    // ?.replace('Bearer', '')
    // .trim();

    const refreshToken =
      req.cookies['refresh_token'];
    if (!refreshToken)
      throw new ForbiddenException(
        'Refresh token malformed',
      );
    return {
      ...payload,
      refreshToken,
    };
  }
}
