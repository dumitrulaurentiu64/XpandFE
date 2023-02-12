import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPlanet } from '../Model/planet';
import { IUserAccount } from '../Model/userAccount';
import { PlanetService } from '../services/planet.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.css']
})
export class PlanetListComponent {

  planets: IPlanet[] = [];
  userAcc: IUserAccount = <IUserAccount>{};

  errorMessage: string = '';

  message: string = '';
  sub!: Subscription;
  subUser!: Subscription;

  constructor(private planetService: PlanetService, 
              private userService: UserService,
              private router: Router
              ) {}

  ngOnInit(): void {

    this.planetService.RequiredRefresh.subscribe(r => {
      this.GetAllPlanets();
    });

    this.subUser = this.userService.getUser().subscribe({
      next: userAcc => {
        this.userAcc = userAcc;
      },
      error: err => {
        this.errorMessage = err;
        this.router.navigate(['/login']);
      }
    });

    this.GetAllPlanets();
  }

  GetAllPlanets(){
    this.sub = this.planetService.getPlanets().subscribe({
      next: planets => {
          this.planets = planets;
      },
      error: err => this.errorMessage = err
  });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  performFilter(): IPlanet[] {
    return this.planets.filter((planet : IPlanet) =>
      planet.planetStatus != 1
    )
  }
}
