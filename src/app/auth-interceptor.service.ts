import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  take, exhaustMap } from 'rxjs/operators';
import { AppServiceService } from './app-service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private app: AppServiceService){};

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.app.authUser.pipe(
            take(1),
            exhaustMap(authUser=>{
                if (!authUser){
                    // console.log('simple handler')
                    return next.handle(req);
                }  
                const modifReq = req.clone({headers:req.headers
                                                            // .set('X-Auth-Token','Bearer '+authUser.token)
                                                             .set('Access-Control-Allow-Origin','*')});

                // console.log('modif handler');
                return next.handle(modifReq);
            })
        )
        
    }
}
