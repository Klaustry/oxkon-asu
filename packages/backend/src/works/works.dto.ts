import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWorkDto {
  @IsNotEmpty()
  @IsString()
  work_id: string;

  @IsNotEmpty()
  @IsString()
  work_name: string;
}

export class UpdateWorkDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  work_id?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  work_name?: string;
}
