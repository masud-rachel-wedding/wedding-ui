import { AppState, State } from './app.reducer';
import { createSelector } from '@ngrx/store';

export const selectAppState = (state: AppState) => state.reducer;

export const getPartyMembers = createSelector( selectAppState, state => state.partyMembers );