import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateReportDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  year: number;

  @IsNumber()
  mileage: number;

  @IsNumber()
  lng: number;

  @IsNumber()
  lat: number;

  @IsNumber()
  price: number;
}

export class UpdateReportDto {
  @IsBoolean()
  approved: boolean;
}

export class EstimateQueryDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  year: number;

  @IsNumber()
  mileage: number;

  @IsNumber()
  lng: number;

  @IsNumber()
  lat: number;
}
