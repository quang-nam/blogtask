import { SetMetadata } from '@nestjs/common';

// to create a public anotation
export const Public = () =>
  SetMetadata('isPublic', true);
