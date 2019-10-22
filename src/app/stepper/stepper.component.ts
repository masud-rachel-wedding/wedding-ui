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
  conflictGroup1: FormGroup;
  conflictGroup2: FormGroup;
  relayConflicts: FormGroup;
  questionnaire: FormGroup;
  rsvpInfo: FormGroup;

  constructor() { }

  ngOnInit() {
    this.identifyYourParty = new FormGroup({
      'partyMembersInfo': new FormArray([]),
      'elaborateOnInfo': new FormControl(null)
    });
    this.conflictGroup1 = new FormGroup({
      'partyMembers': new FormControl(null),
      'description': new FormControl(null),
      'startsOnDate': new FormControl(null),
      'endsOnDate': new FormControl(null)
    });
    this.conflictGroup2 = new FormGroup({
      'partyMembers': new FormControl(null),
      'description': new FormControl(null),
      'startsOnDate': new FormControl(null),
      'endsOnDate': new FormControl(null)
    });
    this.relayConflicts = new FormGroup({
      'conflicts': new FormArray([this.conflictGroup1, this.conflictGroup2])
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
