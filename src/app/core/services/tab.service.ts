import { Injectable, Directive, Input } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TabItem } from '../../../../../NationalBankFrontEnd/src/app/features/admin/tab-item';
import { ApplicationprofileComponent } from '../../../../../NationalBankFrontEnd/src/app/features/Application/applicationprofile/applicationprofile.component';
import { ApplicationaddressComponent } from '../../../../../NationalBankFrontEnd/src/app/features/Application/applicationaddress/applicationaddress.component';
import { ApplicationFinalComponent } from '../../../../../NationalBankFrontEnd/src/app/features/Application/application-final/application-final.component';



@Injectable()
export class TabService {
  selectedIndex =0;
  activeTab$: Subject<TabItem>;
  indexChange: Subject<number> = new Subject<number>();
  private applicationid = new BehaviorSubject(0);
  getapplicationid = this.applicationid.asObservable();
  constructor() {
    this.activeTab$ = new Subject();
  }


  getTabs() {
    return [
      new TabItem( ApplicationprofileComponent, {id: 't1', label: 'Aplication Details', index: 0},true),
			new TabItem( ApplicationaddressComponent, {id: 't2', label: 'Application Address', index: 1},true),
			new TabItem( ApplicationFinalComponent, {id: 't3', label: 'Application Business Info', index: 2},true),
    ]
  }

  isSelected(index: number) {
    if (this.selectedIndex == index) {
        return false;
    } else {
        return true;
    }
}
indexchangefromcomponet(index:number) {
  this.indexChange.next(index);
}
  setappraisalid(applicationid : number){
    this.applicationid.next(applicationid);
  }
}