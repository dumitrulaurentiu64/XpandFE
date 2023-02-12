import { HttpClient } from '@angular/common/http';
import {Emitters} from '../Emitters/emitters';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  authenticated = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );
  }

  logout(): void {
    
    this.http.post(`${environment.logoutUrl}`, {}, {withCredentials: true})
      .subscribe(() => this.authenticated = false);
    this.authenticated = false;
  }
}
