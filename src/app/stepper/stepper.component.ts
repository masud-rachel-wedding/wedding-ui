import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  FormArray
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
      'partyMembersInfo': new FormArray([])
    });
    this.relayConflicts = new FormGroup({
      'conflict': new FormControl( null, Validators.required )
    });
    this.questionnaire = new FormGroup({
      'preference': new FormControl( null, Validators.required) 
    });
    this.rsvpInfo = new FormGroup({
      'done': new FormControl( null, Validators.required )
    });

    // this.firstFormGroup.valueChanges.subscribe(newVal => console.log(newVal));
    // this.secondFormGroup.valueChanges.subscribe(newVal => console.log(newVal));
  }

  onSubmit(event: any) {
    console.log(event);
    // console.log(this.firstFormGroup.get('firstCtrl'));
  }

  // ngOnDestroy() {
  //   this.partyMembersSub.unsubscribe();
  // }
}
