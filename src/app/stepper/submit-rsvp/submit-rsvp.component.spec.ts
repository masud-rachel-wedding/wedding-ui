import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitRsvpComponent } from './submit-rsvp.component';

describe('SubmitRsvpComponent', () => {
  let component: SubmitRsvpComponent;
  let fixture: ComponentFixture<SubmitRsvpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitRsvpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitRsvpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
