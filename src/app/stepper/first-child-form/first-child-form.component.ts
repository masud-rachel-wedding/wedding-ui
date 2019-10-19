import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-first-child-form',
  templateUrl: './first-child-form.component.html',
  styleUrls: ['./first-child-form.component.scss']
})
export class FirstChildFormComponent implements OnInit {
  @Input() parentForm: FormGroup;

  constructor() { }

  ngOnInit() {
    // this.parentForm.get('firstCtrl').valueChanges.subscribe(newVal => console.log(newVal));
  }

}
