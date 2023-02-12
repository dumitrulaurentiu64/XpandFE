import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserAccount } from '../Model/userAccount';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup = <FormGroup>{};
  subUser!: Subscription;
  userAcc: IUserAccount = <IUserAccount>{};
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    this.subUser = this.userService.getUser().subscribe({
      next: userAcc => {
        this.userAcc = userAcc;
        this.router.navigate(['/planets']);
      },
      error: err => {
        this.errorMessage = err;
      }
    });

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