import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IUserAccount } from '../Model/userAccount';
import {Emitters} from '../Emitters/emitters';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  captainID = 0;
  message = '';
  constructor(private http: HttpClient) {}

  getUser(): Observable<IUserAccount>{
    return this.http.get<IUserAccount>(`${environment.userUrl}`, {withCredentials: true}).pipe(
      tap(data => {
        console.log('All', JSON.stringify(data));
        this.captainID = data.captainID;
        Emitters.authEmitter.emit(true);
      }),
      catchError(this.handleError)
    )
  }

  private handleError(err: HttpErrorResponse) {
    this.message = 'You are not logged in';
    Emitters.authEmitter.emit(false);
    return throwError(() => this.message);
  }
}
