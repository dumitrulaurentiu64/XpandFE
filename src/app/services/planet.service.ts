
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPlanet } from '../Model/planet';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  private _refreshrequired=new Subject<void>();
  
  get RequiredRefresh(){
    return this._refreshrequired;
  }

  constructor(private http: HttpClient) {}

  getPlanets(): Observable<IPlanet[]> {
    return this.http.get<IPlanet[]>(`${environment.planetUrl}`).pipe( 
        tap(data => console.log('All', JSON.stringify(data))),            
        catchError(this.handleError)                                      
    )
  }

  getPlanetByID(id: number): Observable<IPlanet>{
    return this.http.get<IPlanet>(`${environment.planetUrl}/`+id).pipe(
      tap(data => console.log('All', JSON.stringify(data))),
        catchError(this.handleError)   
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

  Save(planet:IPlanet){
    console.log(planet);
    return this.http.put(`${environment.planetUrl}`,planet).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      })
    );
  }

}
