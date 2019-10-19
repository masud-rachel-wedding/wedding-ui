import { Action, createReducer, on } from '@ngrx/store';
import { login }from './app.actions';

export interface AppState {
  reducer: State
}

export interface State {
  username: string;
  password: string;
};

const initialState: State = {
  username: null,
  password: null
};
 
export function Reducer(state: State | undefined, payload: Action) {
  return createReducer(
    initialState,

    on( login, (state, payload) => {
      return { ...state, username: payload.username, password: payload.password };
    }),

  )(state, payload);
}