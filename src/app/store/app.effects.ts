import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, withLatestFrom, exhaustMap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select, Action } from '@ngrx/store';
import { AppState } from './app.reducer';
import * as appActions from './app.actions';
import { selectAppState } from './app.selectors';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*'
  })
};

@Injectable()
export class Effects {
  constructor(
    private action$: Actions,
    private http: HttpClient,
    private store: Store<AppState>) {
  }

  private url: string = 'http://ec2-3-88-85-49.compute-1.amazonaws.com:4000/submitRSVP/';
  // private url: string = 'http://localhost:4000/submitRSVP/';

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
        }, httpOptions).pipe(
          map((data: { result: boolean }) => {
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
