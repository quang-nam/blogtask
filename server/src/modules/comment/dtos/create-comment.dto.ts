import {
  IsDate,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateComment {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  postSlug: string;
}
