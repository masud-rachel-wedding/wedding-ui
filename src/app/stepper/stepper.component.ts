import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from "@angular/forms";
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { updateConflictsArray } from '../store/app.actions';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  isLinear: boolean = true;
  isCompleted: boolean = true;
  identifyYourParty: FormGroup;
  conflictGroup: FormGroup;
  conflictGroup2: FormGroup;
  relayConflicts: FormGroup;
  questionnaire: FormGroup;
  rsvpInfo: FormGroup;
  conflictsArray: any[] = [];
  calendarHash = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' };

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.identifyYourParty = new FormGroup({
      'partyMembersInfo': new FormArray([]),
      'elaborateOnInfo': new FormControl(null)
    });
    this.conflictGroup = new FormGroup({
      'partyMembers': new FormControl(null),
      'description': new FormControl(null),
      'startsOnDate': new FormControl(null),
      'endsOnDate': new FormControl(null)
    });
    this.relayConflicts = new FormGroup({
      'conflicts': new FormArray([this.conflictGroup])
    });
    this.questionnaire = new FormGroup({
      'preference': new FormControl( null, Validators.required) 
    });
    this.rsvpInfo = new FormGroup({
      'done': new FormControl( null, Validators.required )
    });
  }

  onSubmit(event: any) {
    console.log(event);
  }

  getDateArray(date: Date) {
    let dateArray = date.toString().split(' ');
    return [ this.calendarHash[dateArray[1]], dateArray[2], dateArray[3] ];
  }

  getConflictsArray(conflictsArray: any) {
    this.conflictsArray = conflictsArray;
  }

  statusChange(status: boolean) {
    this.isCompleted = !status;
  }

  stepChange(event: any) {
    if (event.previouslySelectedIndex == 2) {
      this.conflictsArray.forEach( conflict => {
        conflict.startsOnDate = this.getDateArray(conflict.startsOnDate);
        conflict.endsOnDate = this.getDateArray(conflict.endsOnDate);
      });
      if(this.conflictsArray.length !== 0) {
        const payload = {
          conflictsArray: this.conflictsArray
        }
        this.store.dispatch( updateConflictsArray( payload));
      }
    }
  }
}
