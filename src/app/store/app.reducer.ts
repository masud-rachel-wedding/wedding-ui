import { Action, createReducer, on } from '@ngrx/store';
import {
  login,
  updatePartyMemberStatus,
  updatePartyMembersElaboration, 
  updateOptOutPartyMembers,
  updateOptOutElaboration,
  updateOptOutKnowByDate,
  updateCountryVote,
  updateConflictsArray,
  updateQuestionnaire
}from './app.actions';

export interface AppState {
  reducer: State
}

export interface State {
  username: string;
  password: string;
  countryVote: string;
  partyMembers: string[];
  party: {
    members: { name: string, status: string }[];
    elaboration: string;
  };
  conflictsOptOut: {
    partyMembers: string[];
    elaboration: string;
    knowByDate: string[];
  };
  conflictsArray: any[];
  questionnaire: {
    stayWith: string,
    needQuiet: string,
    wholeTime: string,
    rentalCar: string,
    changedLocation: string,
    generalComment: string
  };
};

const initialState: State = {
  username: null,
  password: null,
  countryVote: null,
  partyMembers: ['Nila Bala', 'Mukie Ramkumar', 'Baby Shankur', 'Baby Sharktooth'],
  party: {
    members: [
      { name: 'Nila Bala', status: null },
      { name: 'Mukie Ramkumar', status: null },
      { name: 'Baby Shankur', status: null },
      { name: 'Baby Sharktooth', status: null }
    ],
    elaboration: null,
  },
  conflictsOptOut: {
    partyMembers: null,
    elaboration: null,
    knowByDate: null,
  },
  conflictsArray: [],
  questionnaire: {
    stayWith: null,
    needQuiet: null,
    wholeTime: null,
    rentalCar: null,
    changedLocation: null,
    generalComment: null
  }
};
 
export function Reducer(state: State | undefined, payload: Action) {
  return createReducer(
    initialState,

    on( login, (state, payload) => {
      return { ...state, username: payload.username, password: payload.password };
    }),

    on( updateCountryVote, (state, payload) => {
      return { ...state, countryVote: payload.countryVote };
    }),

    on( updatePartyMemberStatus, (state, payload) => {
      const guestStatusArray = [ 'coming', 'maybe', 'probablyNot' ];
      const { guestStatus } = payload;
      const { guestIdx } = payload;
      let members = [ ...state.party.members ];
      let member = members[guestIdx];

      guestStatusArray.forEach( status => {
        if (guestStatus === status) {
          member.status= status;
        }
      });

      members[guestIdx] = member;
      let party = {
        ...state.party,
        members
      };

      return { ...state, party };
    }),

    on( updatePartyMembersElaboration, (state, payload) => {
      let party = {
        ...state.party,
        elaboration: payload.elaboration
      };
      return { ...state, party };
    }),

    on( updateOptOutPartyMembers, (state, payload) => {
      let conflictsOptOut = {
        ...state.conflictsOptOut,
        partyMembers: payload.optOutPartyMembers
      }
      return { ...state, conflictsOptOut };
    }),

    on( updateOptOutElaboration, (state, payload) => {
      let conflictsOptOut = {
        ...state.conflictsOptOut,
        elaboration: payload.elaboration
      }
      return { ...state, conflictsOptOut };
    }),
    
    on( updateOptOutKnowByDate, (state, payload) => {
      let conflictsOptOut = {
        ...state.conflictsOptOut,
        knowByDate: payload.knowByDate
      }
      return { ...state, conflictsOptOut };
    }),

    on( updateConflictsArray, (state, payload) => {
      return { ...state, conflictsArray: payload.conflictsArray };
    }),

    on( updateQuestionnaire, (state, payload) => {
      let question = {};
      question[payload.question] = payload.response;

      let questionnaire = {
        ...state.questionnaire,
        ...question
      }
      return { ...state, questionnaire }
    })

  )(state, payload);
}