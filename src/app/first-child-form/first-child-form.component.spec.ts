import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstChildFormComponent } from './first-child-form.component';

describe('FirstChildFormComponent', () => {
  let component: FirstChildFormComponent;
  let fixture: ComponentFixture<FirstChildFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstChildFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstChildFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
