import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root",
})

export class EventBusService {
    constructor() {}
    public subject$ = new Subject<any>();

    passValue(data:any) {
        this.subject$.next(data);
    }

}