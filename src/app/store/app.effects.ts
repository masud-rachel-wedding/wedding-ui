import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, withLatestFrom, exhaustMap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select, Action } from '@ngrx/store';
import { AppState } from './app.reducer';
import * as appActions from './app.actions';
import { selectAppState } from './app.selectors';
import { Observable, of } from 'rxjs';

@Injectable()
export class Effects {
  constructor(
    private action$: Actions,
    private http: HttpClient,
    private store: Store<AppState>) {
  }

  private url: string = 'https://localhost:44308/api/ToDo';

  submitRSVP$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(appActions.submitRSVP),
      withLatestFrom(this.store.pipe( select(selectAppState))),
      exhaustMap(([_, state]) => //other lady uses a mergeMap
        this.http.post(this.url, {
          code: state.code,
          countryVote: state.countryVote,
          party: state.party,
          conflicts: state.conflicts,
          questionnaire: state.questionnaire
        }).pipe(
          map((data: {result: boolean, msg: string}) => {
            return appActions.updateSubmitResult({result: data.result});
          }),
          catchError((error: Error) => {
            console.log(error);
            return of(appActions.updateSubmitResult({result: false}));
          })
        )
      )
    )
  );
 
}
