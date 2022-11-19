import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateObjectDto {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  region: string;

  @IsNotEmpty()
  @IsString()
  reference_url: string;
}

export class UpdateObjectDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  region?: string;
}
