import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  isLinear = false;
  ourVision: FormGroup;
  identifyYourParty: FormGroup;
  secondFormGroup: FormGroup;

  constructor() { }

  ngOnInit() {
    this.ourVision = new FormGroup({
      'voteForCountry': new FormControl("")
    });
    this.identifyYourParty = new FormGroup({
      'identifyGuest': new FormControl("")
    });
    this.secondFormGroup = new FormGroup({
      'secondCtrl': new FormControl("", Validators.required)
    });

    // this.firstFormGroup.valueChanges.subscribe(newVal => console.log(newVal));
    // this.secondFormGroup.valueChanges.subscribe(newVal => console.log(newVal));
  }

  onSubmit(event: any) {
    console.log(event);
    // console.log(this.firstFormGroup.get('firstCtrl'));
  }
}
