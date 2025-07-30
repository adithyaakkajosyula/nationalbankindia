import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import{MatTab, MatTabChangeEvent, MatTabsModule} from '@angular/material/tabs';
import { ApplicationprofileComponent } from '../../../../../NationalBankFrontEnd/src/app/features/Application/applicationprofile/applicationprofile.component';
import { ApplicationaddressComponent } from '../../../../../NationalBankFrontEnd/src/app/features/Application/applicationaddress/applicationaddress.component';
import { TabItem } from '../../../../../NationalBankFrontEnd/src/app/features/admin/tab-item';
import { TabService } from '../../../../../NationalBankFrontEnd/src/app/core/services/tab.service';
import { ApidataService } from '../../../../../NationalBankFrontEnd/src/app/core/services/apidata.service';
import { FormControl,FormGroup,FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Subject, Observable, filter, map, startWith, switchMap, mergeMap, debounceTime } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DataProviderDirective } from 'src/app/core/directives/data-provider.directive';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ApplicationFinalComponent } from '../Application/application-final/application-final.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { CanDeactivateFn } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  
  standalone: true, // This marks it as a standalone component
  imports: [CommonModule,MatTabsModule,SharedModule,ReactiveFormsModule,ApplicationaddressComponent,ApplicationprofileComponent,ApplicationFinalComponent] // Import SharedModule which includes common modules
})
export class AdminComponent implements OnInit {
  tabs: TabItem[];
  stateCtrl = new FormControl('');
  getappraisals: Observable<any[]>;
  appraisals :any[];
  isActive = true;
  selectedIndex: number = 0; // Initialize directly

  constructor(public tabService: TabService,public apidataservice : ApidataService,private formbuilder:FormBuilder, private cdr: ChangeDetectorRef ) {
    console.log("Lazy Loaded Module");
    this.tabs = this.tabService.getTabs();
  }

  ngOnInit(): void {
    this.getappraisals = this.stateCtrl.valueChanges.pipe(    
      startWith(''),
      map((value:any) => value.length >= 1 ? this._filter(value || ''): []),
    );

    this.selectedIndex = this.tabService.selectedIndex || 0; // Set the initial value

    this.tabService.indexChange.subscribe((index: number) => {
      this.selectedIndex = index; // Update when index changes
      this.cdr.detectChanges(); // Ensure change detection if necessary
    });
  }

  private _filter(value: string):any[]{
    const filterValue = value.toLowerCase();
   
       this.apidataservice.getappraisals().subscribe(

      (response :[] | any[]) => {
          this.appraisals =  response.filter((fruit : any) => fruit.name.toLowerCase().indexOf(filterValue) === 0);
      },
      (error : any) => {
        console.log('Something went wrong: ', error);
      }
    );

    return this.appraisals.length === 0 ? [{id:"0",name:"No Results"}] : this.appraisals;
  }

   onseleteditem(object : any){
     this.isActive = false;
  }
  isSelected(index: number) {
    if (this.selectedIndex == index) {
        return false;
    } else {
        return true;
    }
}

}

   
