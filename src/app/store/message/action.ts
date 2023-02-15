import { createAction, props } from '@ngrx/store';

// get message
export const getMessage = createAction('[Message] Get Message');
export const loadMessageSuccess = createAction('[Message] Get Message success', props<{response:[]}>());

// add message
export const addMessage = createAction('[Message] Add Message', props<{data:any}>());
export const addMessageSuccess = createAction('[Message] Add Message success', props<{data:[]}>())

// delete message
export const removeMessage = createAction('[Message] Remove Message', props<{id:string}>());
export const removeMessageSuccess = createAction('[Message] Remove Message success', props<{response:any}>());

// update message
export const updateMessage = createAction('[Message] Update Message', props<{data:any}>());
export const updateMessageSuccess = createAction('[Message] Update Message success', props<{data:any}>());

// get selected Message
export const setSelectedMessage = createAction('[Message] Set Selected Message', props<{id:string}>());
export const getSelectedMessageSuccess = createAction('[Message] Get Selected Message success', props<{response:[]}>());

// handle error 
export const errorMessage = createAction('[Message] handle error', props<{error:any}>());