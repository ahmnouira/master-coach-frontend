import { Injectable } from '@angular/core';
import { Observable,} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BaseService } from '../services/base-service/base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {

  login(email: string, password: string): Observable<any> {
    return this.httpClient
      .post<any>(
        this.apiUri + '/login',
        JSON.stringify({ email: email, password: password }),
        this.httpOptions
      )
      .pipe(retry(0), catchError(this.handleError));
  }
}
