import { Action, createReducer, on } from '@ngrx/store';
import {
  login,
  updatePartyMemberStatus,
  updatePartyMembersElaboration, 
  updateOptOutPartyMembers,
  updateOptOutElaboration}from './app.actions';
import { PartyMemberRow } from './app.index'

export interface AppState {
  reducer: State
}

export interface State {
  username: string;
  password: string;
  partyMembers: string[];
  partyMembersInfo: PartyMemberRow[];
  partyMembersElaboration: string;
  optOutPartyMembers: string[];
  optOutElaboration: string;
};

const initialState: State = {
  username: null,
  password: null,
  partyMembers: ['Nila Bala', 'Mukie Ramkumar', 'Baby Shankur', 'Baby Sharktooth'],
  partyMembersInfo: [
    { name: 'Nila Bala', coming: null, maybe: null, probablyNot: null },
    { name: 'Mukie Ramkumar', coming: null, maybe: null, probablyNot: null },
    { name: 'Baby Shankur', coming: null, maybe: null, probablyNot: null }
  ],
  partyMembersElaboration: null,
  optOutPartyMembers: null,
  optOutElaboration: null
};
 
export function Reducer(state: State | undefined, payload: Action) {
  return createReducer(
    initialState,

    on( login, (state, payload) => {
      return { ...state, username: payload.username, password: payload.password };
    }),

    on( updatePartyMemberStatus, (state, payload) => {
      const guestStatusArray = [ 'coming', 'maybe', 'probablyNot' ];
      const { guestStatus } = payload;
      const { guestIdx } = payload;
      let partyMembersInfo = [ ...state.partyMembersInfo ];
      let partyMemberRow = partyMembersInfo[guestIdx];
      guestStatusArray.forEach( status => {
        if (guestStatus === status) {
          partyMemberRow[status] = true;
        } else {
          partyMemberRow[status] = false;
        }
      });
      partyMembersInfo[guestIdx] = partyMemberRow;
      return { ...state, partyMembersInfo };
    }),

    on( updatePartyMembersElaboration, (state, payload) => {
      return { ...state, partyMembersElaboration: payload.elaboration };
    }),

    on( updateOptOutPartyMembers, (state, payload) => {
      return { ...state, optOutPartyMembers: payload.optOutPartyMembers };
    }),

    on( updateOptOutElaboration, (state, payload) => {
      return { ...state, optOutElaboration: payload.elaboration };
    }),
    

  )(state, payload);
}