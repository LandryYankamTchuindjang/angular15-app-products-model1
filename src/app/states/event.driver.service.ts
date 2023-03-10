import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ActionEvent } from "./product.state";

@Injectable({providedIn:"root"})
export class EventDriverSevice {
  sourceEventSuject:Subject<ActionEvent>=new Subject<ActionEvent>();
  sourceEventSujectObservable=this.sourceEventSuject.asObservable();

  sourceEventSuject2:Subject<ActionEvent>=new Subject<ActionEvent>();
  sourceEventSujectObservable2=this.sourceEventSuject.asObservable();

  publishEvent(event:ActionEvent) {
    this.sourceEventSuject.next(event);
  }
}
