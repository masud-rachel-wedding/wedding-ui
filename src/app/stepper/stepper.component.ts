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
  isLinear: boolean = false;
  identifyYourParty: FormGroup;
  relayConflicts: FormGroup;
  questionnaire: FormGroup;
  rsvpInfo: FormGroup;

  constructor() { }

  ngOnInit() {
    this.identifyYourParty = new FormGroup({
      'identifyGuest': new FormControl("", Validators.required)
    });
    this.relayConflicts = new FormGroup({
      'conflict': new FormControl("", Validators.required)
    });
    this.questionnaire = new FormGroup({
      'preference': new FormControl("", Validators.required)
    });
    this.rsvpInfo = new FormGroup({
      'done': new FormControl("", Validators.required)
    });

    // this.firstFormGroup.valueChanges.subscribe(newVal => console.log(newVal));
    // this.secondFormGroup.valueChanges.subscribe(newVal => console.log(newVal));
  }

  onSubmit(event: any) {
    // console.log(this.firstFormGroup.get('firstCtrl'));
  }
}
