import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
  @Input() parentForm: FormGroup;
    /* Parent Form:

    this.questionnaire = new FormGroup({
      'preference': new FormControl("", Validators.required)
    });

    this.parentForm.get('firstCtrl').valueChanges.subscribe(newVal => console.log(newVal));
    
    */
  constructor() { }

  ngOnInit() {
  }

}
