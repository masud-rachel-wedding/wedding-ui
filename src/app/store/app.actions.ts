import { createAction, props } from '@ngrx/store';
 
export const login = createAction('Login', props<{ code: string, partyMembers: string[] }>());
export const updateCountryVote = createAction('Update the country vote', props<{ countryVote: string }>());
export const updatePartyMemberStatus = createAction('Update the status of a party member', props<{ guestStatus: string, guestIdx: number }>());
export const updatePartyMembersElaboration = createAction('Update the partyMembersInfo elaboration', props<{ elaboration: string }>());
export const updateOptOutPartyMembers = createAction('Update which party members cannot fill out conflicts', props<{ optOutPartyMembers: string[] }>());
export const updateOptOutElaboration = createAction('Update the opt-out elaboration', props<{ elaboration: string }>());
export const updateOptOutKnowByDate = createAction('Update the opt-out know-by date', props<{ knowByDate: string[] }>());
export const updateConflictsArray = createAction('Update the conflicts array', props<{ conflictsArray: any }>());
export const updateQuestionnaire = createAction('Update the questionnaire', props<{ question: string, response: string }>());
export const submitRSVP = createAction('Submit RSVP info');
export const updateSubmitResult = createAction('Update the result of the final submit', props<{ result: boolean }>());
