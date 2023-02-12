import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup = <FormGroup>{}

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      userPassword: ''
    });
  }

  submit(): void {
    this.http.post(`${environment.authUrl}`, this.form.getRawValue(), {
      withCredentials: true
    }).subscribe(() => this.router.navigate(['/planets']));
  }
}