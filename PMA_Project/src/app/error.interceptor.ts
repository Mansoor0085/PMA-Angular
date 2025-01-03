import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GlobalErrorHandlerService } from "./global-error-handler.service";
import { catchError, Observable } from "rxjs";

@Injectable()

export class ErrorInterceptor implements HttpInterceptor
{
  constructor(private errorHandler : GlobalErrorHandlerService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.errorHandler.handleError(error);
      })
    );
  }
}