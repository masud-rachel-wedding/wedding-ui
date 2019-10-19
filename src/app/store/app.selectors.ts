import { AppState, State } from './app.reducer';
import { createSelector } from '@ngrx/store';

export const selectAppState = (state: AppState) => state.reducer;

// export const getUsername = createSelector( selectAppState, state => state.username);