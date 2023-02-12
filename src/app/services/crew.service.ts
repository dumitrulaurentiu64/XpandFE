import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICrew } from '../Model/crew';

@Injectable({
  providedIn: 'root'
})
export class CrewService {

  constructor(private http: HttpClient) {}

  getCrew(id: number): Observable<ICrew> {
    return this.http.get<ICrew>(`${environment.crewUrl}/${id}`).pipe(               // the Obs. sends data through this pipe
        tap(data => console.log('All', JSON.stringify(data))),            // we can call different methods inside the pipe for logging and error handling
        catchError(this.handleError)                                      // like tap and catchError
    )
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if ( err.error instanceof ErrorEvent ) {
        errorMessage = 'An error occurred: ${err.error.message}';
    } else {
        errorMessage = `Server return code: ${err.status}, error message is ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
