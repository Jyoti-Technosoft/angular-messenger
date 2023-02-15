import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, tap, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as MessageActions from './action';
import { CrudService } from '../../../app/services/crud.service';
import { MESSAGE_SUCCESS_OPERATION } from './enum';


@Injectable({ providedIn: 'root' })
export class MessageEffects {
    constructor(private actions$: Actions, private service: CrudService) {}

    
    loadMessage$ = createEffect(() => 
    this.actions$.pipe(
        ofType(MessageActions.getMessage),
        switchMap(action =>
            this.service.getAll().pipe(
                map((response: any) => {   
                    return MessageActions.loadMessageSuccess({ response }) 
                }),
                catchError((error) => of(MessageActions.errorMessage({ error})))
            )
        ),),
    );

    addMessage$ = createEffect(() => 
    this.actions$.pipe(
        ofType(MessageActions.addMessage),
        exhaustMap(data =>
            this.service.create(data).pipe(
                map((response: any) => { 
                    this.service.statusPopup(MESSAGE_SUCCESS_OPERATION.MESSAGE_ADD_SUCCESS);
                    return MessageActions.addMessageSuccess(data); 
                }),
                catchError((error) => of(MessageActions.errorMessage({ error})))
            )
        ))
    );


    removeMessage$ = createEffect(() => 
    this.actions$.pipe(
        ofType(MessageActions.removeMessage),
        mergeMap(id =>
            this.service.delete(id?.id).pipe(
                map((response: any) => {   
                    this.service.statusPopup(MESSAGE_SUCCESS_OPERATION.MESSAGE_DELETE_SUCCESS);
                    return MessageActions.removeMessageSuccess(response) 
                }),
                catchError((error) => of(MessageActions.errorMessage({ error }))),
            )
        ))
    );   

    // updateMessage$ = createEffect(() => 
    // this.actions$.pipe(
    //     ofType(MessageActions.updateMessage),
    //     exhaustMap(data =>
    //         this.service.update(data).pipe(
    //             map((response: any) => { 
    //                 this.service.statusPopup(MESSAGE_SUCCESS_OPERATION.MESSAGE_UPDATE_SUCCESS);
    //                 return MessageActions.updateMessageSuccess(response); 
    //             }),
    //             catchError((error) => of(MessageActions.errorMessage({ error})))
    //         )
    //     ))
    // );

    updateMessage$ = createEffect(() => 
    this.actions$.pipe(
        ofType(MessageActions.updateMessage),
        mergeMap(data =>
            this.service.update(data).pipe(
                map((response: any) => { 
                    this.service.statusPopup(MESSAGE_SUCCESS_OPERATION.MESSAGE_UPDATE_SUCCESS);
                    return MessageActions.updateMessageSuccess(data); 
                }),
                catchError((error) => of(MessageActions.errorMessage({ error})))
            )
        ))
    );

    errorMessage$ = createEffect(() => 
    this.actions$.pipe(
        ofType(MessageActions.errorMessage),
        tap((action) => {
            console.log("action for error ----------",action)
            this.service.statusPopup("failed to delete")
        })
    ));

}