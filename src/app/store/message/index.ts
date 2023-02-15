import { ActionReducerMap, createFeatureSelector, createSelector,} from '@ngrx/store';
import * as fromReducer from '@store/message/reducers';

export interface State {
    getMessagelist: fromReducer.State,
    selectedMessage: fromReducer.State,
}

export const reducers: ActionReducerMap<any> = {
    getMessagelist: fromReducer.reducer,
    selectedMessage: fromReducer.reducer,
};

export const getStateSelector = createSelector(
    createFeatureSelector('getMessagelist'),
    createFeatureSelector('selectedMessage'),
    fromReducer.getState
);