import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

interface ClassConstructor {
    new(...args: any[]): {};
}

export const Serialize = (dto: ClassConstructor) => {
    return UseInterceptors(new SerializeInterceptor(dto));
};

export class SerializeInterceptor implements NestInterceptor {

    constructor(private dto: ClassConstructor) { }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data: any) => {
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true
                });
            })
        );
    }
}