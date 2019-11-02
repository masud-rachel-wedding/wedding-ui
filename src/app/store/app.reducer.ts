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
  },
  optOutPartyMembers: string[];
  optOutElaboration: string;
  optOutKnowByDate: string[];
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
  optOutPartyMembers: null,
  optOutElaboration: null,
  optOutKnowByDate: null,
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
      }
      
      return { ...state, party };
    }),

    on( updatePartyMembersElaboration, (state, payload) => {
      return { ...state, partyElaboration: payload.elaboration };
    }),

    on( updateOptOutPartyMembers, (state, payload) => {
      return { ...state, optOutPartyMembers: payload.optOutPartyMembers };
    }),

    on( updateOptOutElaboration, (state, payload) => {
      return { ...state, optOutElaboration: payload.elaboration };
    }),
    
    on( updateOptOutKnowByDate, (state, payload) => {
      return { ...state, optOutKnowByDate: payload.knowByDate };
    }),

    on( updateConflictsArray, (state, payload) => {
      console.log(payload.conflictsArray);
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