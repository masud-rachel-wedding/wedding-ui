import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { updateQuestionnaire } from 'src/app/store/app.actions';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit, OnDestroy {
  stayWithSub: Subscription;
  needQuietSub: Subscription;
  wholeTimeSub: Subscription;
  rentalCarSub: Subscription;
  changedLocationSub: Subscription;

  @Input() parentForm: FormGroup;
    /* Parent Form:

    this.questionnaire = new FormGroup({
      'stayWith': new FormControl(null, Validators.required),
      'needQuiet': new FormControl(null, Validators.required),
      'wholeTime': new FormControl(null, Validators.required),
      'rentalCar': new FormControl(null, Validators.required),
      'changedLocation': new FormControl(null, Validators.required),
      'generalComment': new FormControl(null)
    });

    */
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.stayWithSub = this.parentForm.get('stayWith').valueChanges.subscribe( val => {
      const payload = {
        question: 'stayWith',
        response: val
      }
      this.store.dispatch( updateQuestionnaire( payload));
    });
    this.needQuietSub = this.parentForm.get('needQuiet').valueChanges.subscribe( val => {
      const payload = {
        question: 'needQuiet',
        response: val
      }
      this.store.dispatch( updateQuestionnaire( payload));
    });
    this.wholeTimeSub = this.parentForm.get('wholeTime').valueChanges.subscribe( val => {
      const payload = {
        question: 'wholeTime',
        response: val
      }
      this.store.dispatch( updateQuestionnaire( payload));
    });
    this.rentalCarSub = this.parentForm.get('rentalCar').valueChanges.subscribe( val => {
      const payload = {
        question: 'rentalCar',
        response: val
      }
      this.store.dispatch( updateQuestionnaire( payload));
    });
    this.changedLocationSub = this.parentForm.get('changedLocation').valueChanges.subscribe( val => {
      const payload = {
        question: 'changedLocation',
        response: val
      }
      this.store.dispatch( updateQuestionnaire( payload));
    });
  }

  saveElaboration() {
    const payload = {
      question: 'generalComment',
      response: this.parentForm.get('generalComment').value
    }
    this.store.dispatch( updateQuestionnaire( payload));
  }
  
  ngOnDestroy() {
    this.stayWithSub.unsubscribe();
    this.needQuietSub.unsubscribe();
    this.wholeTimeSub.unsubscribe();
    this.rentalCarSub.unsubscribe();
    this.changedLocationSub.unsubscribe();
  }
  

}
