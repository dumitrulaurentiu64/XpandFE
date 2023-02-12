import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { CrewService } from '../services/crew.service';

import { MatDialog } from '@angular/material/dialog';

import { IPlanet } from '../Model/planet';
import { ICrew } from '../Model/crew';
import { PlaneteditmodalComponent } from '../planeteditmodal/planeteditmodal.component';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})
export class PlanetComponent {

  @Input()
  planet!: IPlanet;

  crew: ICrew = <ICrew>{};

  robotList: string = '';

  errorMessage: string = '';
  sub!: Subscription;

  constructor(private crewService: CrewService,private dialog: MatDialog) {}

  ngOnInit(): void {
    if(this.planet.crewID != 0){
      this.sub = this.crewService.getCrew(this.planet.crewID).subscribe({
        next: crew => {
            this.crew = crew;
            console.log(this.crew);
            this.crew.robots.forEach(robot => {
              this.robotList = this.robotList.concat(robot.robotName + " | ");
            });
            this.robotList = this.robotList.substring(0, this.robotList.length-2)
        },
        error: err => this.errorMessage = err
    });
    }
    
  }

  
  FunctionEdit(planetID: any) {
    console.log('I have been here')
    this.OpenDialog('1000ms','600ms',planetID)
    
  }

  OpenDialog(enteranimation: any, exitanimation: any,planetID:any) {
    console.log('I have been here')
    this.dialog.open(PlaneteditmodalComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "100%",
      data:{
        planetID:planetID
      }
    })
  }
}
