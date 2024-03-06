import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { JwtPayload } from '../type';
import config from 'src/configs';

export class AtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor() {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.atsecret,
    });
  }
  validate(payload: JwtPayload) {
    return payload;
  }
}
