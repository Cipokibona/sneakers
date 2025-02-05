import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyService implements HttpInterceptor{

  private apiKey = '1zMgkNFeKNUrtC+NhkEcpw==563vnlemN3cEU9Vd';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const clonedRequest = req.clone({
      setHeaders: {
        'X-Api-Key': this.apiKey
      }
    });

    return next.handle(clonedRequest);
  }

  constructor() { }
}
