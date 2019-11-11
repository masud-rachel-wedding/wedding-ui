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
  updateQuestionnaire,
  updateSubmitResult,
  updateConflictsElaboration
}from './app.actions';

export interface AppState {
  reducer: State
}

export interface State {
  code: string;
  countryVote: string;
  partyMembers: string[];
  party: {
    members: { name: string, status: string }[];
    elaboration: string;
  };
  conflicts: {
    conflictsArray: any[];
    conflictsOptOut: {
      partyMembers: string[];
      elaboration: string;
      knowByDate: string[];
    };
    elaboration: string;
  };
  questionnaire: {
    stayWith: string,
    needQuiet: string,
    wholeTime: string,
    rentalCar: string,
    changedLocation: string,
    generalComment: string
  };
  submitResult: boolean
};

const initialState: State = {
  code: null,
  countryVote: null,
  partyMembers: null,
  party: {
    members: [],
    elaboration: null,
  },
  conflicts: {
    conflictsArray: [],
    conflictsOptOut: {
      partyMembers: [],
      elaboration: null,
      knowByDate: [],
    },
    elaboration: null
  },
  questionnaire: {
    stayWith: null,
    needQuiet: null,
    wholeTime: null,
    rentalCar: null,
    changedLocation: null,
    generalComment: null
  },
  submitResult: null
};
 
export function Reducer(state: State | undefined, payload: Action) {
  return createReducer(
    initialState,

    on( login, (state, payload) => {
      let members: { name: string; status: string; }[] = [];
      payload.partyMembers.forEach( member => {
        members.push({ name: member, status: null });
      });

      const party = {
        ...state.party,
        members
      };
      
      return { ...state, code: payload.code, partyMembers: payload.partyMembers, party };
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
        ...state.conflicts.conflictsOptOut,
        partyMembers: payload.optOutPartyMembers
      }
      let conflicts = {
        ...state.conflicts,
        conflictsOptOut
      }
      return { ...state, conflicts };
    }),

    on( updateOptOutElaboration, (state, payload) => {
      let conflictsOptOut = {
        ...state.conflicts.conflictsOptOut,
        elaboration: payload.elaboration
      }
      let conflicts = {
        ...state.conflicts,
        conflictsOptOut
      }
      return { ...state, conflicts };
    }),
    
    on( updateOptOutKnowByDate, (state, payload) => {
      let conflictsOptOut = {
        ...state.conflicts.conflictsOptOut,
        knowByDate: payload.knowByDate
      }
      let conflicts = {
        ...state.conflicts,
        conflictsOptOut
      }
      return { ...state, conflicts };
    }),

    on( updateConflictsArray, (state, payload) => {
      let conflictsArray = payload.conflictsArray;
      let conflicts = {
        ...state.conflicts,
        conflictsArray
      }
      return { ...state, conflicts };
    }),

    on( updateConflictsElaboration, (state, payload) => {
      let conflicts = {
        ...state.conflicts,
        elaboration: payload.elaboration
      }
      return { ...state, conflicts };
    }),

    on( updateQuestionnaire, (state, payload) => {
      let question = {};
      question[payload.question] = payload.response;

      let questionnaire = {
        ...state.questionnaire,
        ...question
      }
      return { ...state, questionnaire }
    }),

    on( updateSubmitResult, (state, payload) => {
      return { ...state, submitResult: payload.result }
    })

  )(state, payload);
}