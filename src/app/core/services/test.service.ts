import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor() { }
  
  private datasource = new BehaviorSubject<string>('default data by behaviorsubject');
  currentData = this.datasource.asObservable(); // Converts behaviorsubject as observable // any one can subscribe and get value
  
  changeData(data: string) {
    this.datasource.next(data); // will give a new value
  }
}
