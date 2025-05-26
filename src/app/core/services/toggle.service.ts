import { EventEmitter, Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
@Injectable()
export class ToggleService {

  mystatusChanged: EventEmitter<boolean> = new EventEmitter();
  mystatus: boolean = false;
  constructor() {}
  get data(): boolean {
    return this.mystatus;
  }
  set data(val: boolean) {
    this.mystatus = val;
    this.mystatusChanged.emit(val);
}
}