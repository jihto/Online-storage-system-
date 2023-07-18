import { CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException } from "@nestjs/common";
import { Observable, TimeoutError, catchError, throwError, timeout } from "rxjs";


//interceptor if request has more 4s will throw error request time out 
@Injectable()
export class TimeOutInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            timeout(3000),
            catchError(error => {
                //property of a constructor appears in TimeoutError
                if(error instanceof TimeoutError)
                    return throwError(()=> new RequestTimeoutException());
                return throwError(()=> new Error);
            })
        )
    }
}

