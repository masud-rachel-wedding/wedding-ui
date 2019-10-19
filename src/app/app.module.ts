import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from "@angular/material/stepper";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { Reducer } from './store/app.reducer';
import { AppComponent } from "./app.component";
import { LoginComponent } from './login/login.component';
import { StepperComponent } from './stepper/stepper.component';
import { FirstChildFormComponent } from './stepper/first-child-form/first-child-form.component';
import { OurVisionComponent } from './stepper/our-vision/our-vision.component';
import { IdentifyYourPartyComponent } from './stepper/identify-your-party/identify-your-party.component';

@NgModule({
  declarations: [
    AppComponent,
    StepperComponent,
    FirstChildFormComponent,
    LoginComponent,
    OurVisionComponent,
    IdentifyYourPartyComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ reducer: Reducer }),
    MatCardModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
