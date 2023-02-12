import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ICrew } from '../Model/crew';
import { IPlanet } from '../Model/planet';
import { CrewService } from '../services/crew.service';
import { PlanetService } from '../services/planet.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-planeteditmodal',
  templateUrl: './planeteditmodal.component.html',
  styleUrls: ['./planeteditmodal.component.css']
})
export class PlaneteditmodalComponent {
  constructor(private planetService: PlanetService, private userService: UserService, private crewService: CrewService, public dialogref: MatDialogRef<PlaneteditmodalComponent>,@Inject(MAT_DIALOG_DATA) public planetData:any) { }

  errorMessage: string = '';
  editPlanet: IPlanet = <IPlanet>{};
  newPlanet: IPlanet = <IPlanet>{};
  crewInfo: ICrew = <ICrew>{};
  subPlanet!: Subscription;

  ngOnInit(): void {
    if(this.planetData.planetID!=null && this.planetData.planetID!=''){
      this.LoadEditData(this.planetData.planetID);
    }
  }


  LoadEditData(planetID: number) {
    this.subPlanet = this.planetService.getPlanetByID(planetID).subscribe({
      next: planet => {
        this.editPlanet = planet;
        this.Reactiveform.setValue({
          planetID:this.editPlanet.planetID,
          planetName:this.editPlanet.planetName,
          planetDescription:this.editPlanet.planetDescription,
          planetStatus:this.editPlanet.planetStatus,
          crewID:this.userService.captainID})
      },
      error: err => this.errorMessage = err
    });
  }

  Reactiveform = new FormGroup({
    planetID: new FormControl({ value: 0, disabled: false }),
    planetName: new FormControl("", Validators.required),
    planetDescription: new FormControl("", Validators.required),
    planetStatus: new FormControl(),
    crewID: new FormControl()
  });
  SavePlanet() {
    if (this.Reactiveform.valid) {
      this.newPlanet = <IPlanet> this.Reactiveform.value;
      this.planetService.Save(this.newPlanet).subscribe(result => {
        console.log(result);
        this.dialogref.close();
      });

    } else {
      console.log("Please Enter valid data")
    }
  }
}
