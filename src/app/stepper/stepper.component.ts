import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from "@angular/forms";
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { updateConflictsArray, submitRSVP } from '../store/app.actions';
import { Observable, Subscription } from 'rxjs';
import { getSubmitResult } from '../store/app.selectors';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  submitResult$: Observable<boolean>;
  submitResultSub: Subscription;

  isLinear: boolean = true;
  isCompleted: boolean = false;
  submissionError: boolean = false;
  showSpinner: boolean = false;
  rsvpComplete: boolean = false;

  identifyYourParty: FormGroup;
  conflictGroup: FormGroup;
  conflictGroup2: FormGroup;
  relayConflicts: FormGroup;
  questionnaire: FormGroup;

  conflictsArray: any[] = [];
  calendarHash = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' };
  error: string = '';

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
      'stayWith': new FormControl(null, Validators.required),
      'needQuiet': new FormControl(null, Validators.required),
      'wholeTime': new FormControl(null, Validators.required),
      'rentalCar': new FormControl(null, Validators.required),
      'changedLocation': new FormControl(null, Validators.required),
      'generalComment': new FormControl(null)
    });

    this.submitResult$ = this.store.pipe( select( getSubmitResult ));
    this.submitResultSub = this.submitResult$.subscribe( val => {
      if(val === null) {
        this.submissionError = false;
        this.showSpinner = false;
        this.rsvpComplete = false;
      }
      else if(val) {
        this.submissionError = false;
        this.showSpinner = false;
        this.rsvpComplete = true;
      }
      else {
        this.submissionError = true;
        this.showSpinner = false;
        this.rsvpComplete = false;
      }
    });
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
    if (event.selectedIndex == 2 && !event.selectedStep.interacted) {
      this.isCompleted = true;
    }
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

  submit() {
    this.showSpinner = true;
    this.store.dispatch( submitRSVP());
  }
}
