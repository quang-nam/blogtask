import { JwtPayload } from '.';

export type JwtPayloadwithRt = JwtPayload & {
  refreshToken: string;
};
