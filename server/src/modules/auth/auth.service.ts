import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/databases/prisma/prisma.service';
import { AuthDto } from './dtos';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, Token } from './type';
import { Response } from 'express';
import config from 'src/configs';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  // tao 1 module hásh password login, trc khi đưa vào db phải hash trc
  async signup(dto: AuthDto): Promise<Token> {
    // generate the password
    const hash = await argon.hash(dto.password);
    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      const tokens = await this.getToken(
        user.id,
        user.email,
        user.role,
      );
      await this.updateRefreshtokenHash(
        user.id,
        tokens.refresh_token,
      );
      return tokens;
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'credentials taken',
          );
        }
      }
      throw error;
    }
    // return the saved user
  }
  async signin(dto: AuthDto, res: Response) {
    // find the user by email
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
    if (!user)
      throw new NotFoundException(
        'User not found',
      );
    // compare the password with the hash
    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );
    if (!pwMatches)
      throw new NotFoundException(
        'User not found',
      );
    const tokens = await this.getToken(
      user.id,
      user.email,
      user.role,
    );
    await this.updateRefreshtokenHash(
      user.id,
      tokens.refresh_token,
    );
    res.cookie(
      'refresh_token',
      tokens.refresh_token,
      {
        httpOnly: true, // http only cookie
        path: '/', // có thể không có
        sameSite: 'strict', // http request chi den tu site nay thoi,stop csrf
        secure: false, // lam thi de la false, deploy thi true
      },
    );
    const { hash, ...others } = user;
    return {
      ...others,
      access_token: tokens.access_token,
    };
  }
  // update hash token
  async updateRefreshtokenHash(
    userId: number,
    rt: string,
  ): Promise<void> {
    const hash = await argon.hash(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedAt: hash,
      },
    });
  }
  async logout(userId: number): Promise<boolean> {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedAt: {
          not: null,
        },
      },
      data: {
        hashedAt: null,
      },
    });
    return true;
  }

  async getToken(
    userId: number,
    email: string,
    role: string,
  ): Promise<Token> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
      role: role,
    };
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        expiresIn: '15m',
        secret: config.jwt.atsecret,
      }),
      this.jwtService.signAsync(jwtPayload, {
        expiresIn: '7d',
        secret: config.jwt.rtsecret,
      }),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async refreshToken(userId: number, rt: string) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
    if (!user || !user.hashedAt)
      throw new ForbiddenException(
        'Access Denied',
      );
    // const rt = rs.cookie['refresh_token'];
    const rtMatches = await argon.verify(
      user.hashedAt,
      rt,
    );
    if (!rtMatches)
      throw new ForbiddenException(
        'Access Denied',
      );
    const tokens = await this.getToken(
      user.id,
      user.email,
      user.role,
    );
    await this.updateRefreshtokenHash(
      user.id,
      tokens.refresh_token,
    );
    return tokens;
  }
}
