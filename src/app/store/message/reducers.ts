import { Action, createReducer, on } from "@ngrx/store";
import * as MessageActions from '@store/message/action';
import { message } from '@store/message/message.model';

export interface State {
    getMessagelist: message[];
    selectedMessage: any;
}

export const getState = (state: State) => { return state; };

export const initialState: State = {
    getMessagelist: [],
    selectedMessage: undefined
};

export function reducer(state: State | undefined, action: Action): any {
    return messageReducer(state, action);
}

const messageReducer = createReducer(initialState,
    on(MessageActions.getMessage, (state) => ({
        ...state, 
    })),
    
    on(MessageActions.loadMessageSuccess,(state, action) => ({
        ...state, getMessagelist: action.response
    })),

    on(MessageActions.removeMessage, (state, id:any) => ({
        ...state,
        getMessagelist: state.getMessagelist.filter(item => item?.id !== id)
    })),

    on(MessageActions.removeMessageSuccess, (state, id:any) => ({
        ...state,
        getMessagelist: state.getMessagelist.filter(item => item?.id !== id)
    })),

    on(MessageActions.updateMessage,(state) => ({
        ...state,
    })),

    on(MessageActions.updateMessageSuccess,(state, message:any) => (
        {
        ...state,
        getMessageList: state.getMessagelist.map((object) => {
            if (object.id == message?.data?.id) {
                object = message?.data;
            }
        })
    })),

    on(MessageActions.addMessage, (state, data:any) => ({
        ...state, getMessagelist: state.getMessagelist.concat(data)
    })),

    on(MessageActions.addMessageSuccess, (state, data:any) => ({
        ...state,
    })),

    on(MessageActions.setSelectedMessage, (state, selectedMessageid:any) => ({
        ...state,
        selectedMessage: state.getMessagelist.find(x => x?.id == selectedMessageid?.id)
    }))
        
);