import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsInt, IsString } from 'class-validator';
import { Document } from 'mongoose';

export class Book extends Document {
  @ApiProperty()
  @IsString() id: string;

  @ApiProperty()
  @IsString() userEmail: string;

  @ApiProperty()
  @IsString() title: string;

  @ApiProperty()
  @IsString() author: string;

  @ApiProperty()
  @IsString() description: string;

  @ApiProperty()
  @IsString() isbn: string;

  @ApiProperty()
  @IsString() publisher: string;

  @ApiProperty()
  @IsInt() numberOfPages: number;

  @ApiProperty()
  @IsBase64() coverImage: string;
}