import {
    IsString,
    IsNumber,
    Min,
    Max,
    IsLatitude,
    IsLongitude,
} from 'class-validator';
export class CreateReportDto {

    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(0)
    @Max(1e6)
    mileage: number;

    @IsNumber()
    @Min(1930)
    @Max(2050)
    year: number;

    @IsNumber()
    @Min(0)
    @Max(1e6)
    price: number;

    @IsLatitude()
    lat: number;

    @IsLongitude()
    lng: number;
}