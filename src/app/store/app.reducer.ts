import { Action, createReducer, on } from '@ngrx/store';
import { login }from './app.actions';
import { PartyMemberRow } from './app.index'

export interface AppState {
  reducer: State
}

export interface State {
  username: string;
  password: string;
  partyMembers: string[];
  partyMembersInfo: PartyMemberRow[];
};

const initialState: State = {
  username: null,
  password: null,
  partyMembers: ['Nila Bala', 'Mukie Ramkumar', 'Baby Shankur'],
  partyMembersInfo: [
    { name: 'Nila Bala', coming: null, maybe: null, probablyNot: null },
    { name: 'Mukie Ramkumar', coming: null, maybe: null, probablyNot: null },
    { name: 'Baby Shankur', coming: null, maybe: null, probablyNot: null }
  ]
};
 
export function Reducer(state: State | undefined, payload: Action) {
  return createReducer(
    initialState,

    on( login, (state, payload) => {
      return { ...state, username: payload.username, password: payload.password };
    }),

  )(state, payload);
}