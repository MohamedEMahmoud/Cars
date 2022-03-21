import { Expose, Transform } from "class-transformer";

export class ReportDto {

    @Expose()
    id: number;

    @Expose()
    make: string;

    @Expose()
    model: string;

    @Expose()
    milage: number;

    @Expose()
    year: number;

    @Expose()
    price: number;

    @Expose()
    lat: number;

    @Expose()
    lng: number;

    @Expose()
    @Transform(({ obj }) => obj.user.id)
    user_id: number;
}