import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataProviderDirective } from '../../../../../../NationalBankFrontEnd/src/app/core/directives/data-provider.directive';
import { TabService } from '../../../../../../NationalBankFrontEnd/src/app/core/services/tab.service';
import { Subject, Observable, filter, map, startWith, switchMap, mergeMap, debounceTime } from 'rxjs';
import { FormControl,FormGroup,FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ApidataService } from '../../../../../../NationalBankFrontEnd/src/app/core/services/apidata.service';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { trigger, transition, style, animate, NoopAnimationPlayer } from '@angular/animations';
import { CanComponentDeactivate, canDeactivateGuard } from 'src/app/core/guards/auth.guard';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
@Component({
  selector: 'app-applicationprofile',
  templateUrl: './applicationprofile.component.html',
  styleUrls: ['./applicationprofile.component.css'],
  standalone: true, // This marks it as a standalone component
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    SharedModule,
    MatSlideToggleModule
  ] 
})
export class ApplicationprofileComponent  implements OnInit,CanComponentDeactivate {
  @Input() tab : any;
  @Input() number:number;
  @Input() tabelement : any;
  stateCtrl = new FormControl('');
  getappraisals: Observable<any[]>;
  appraisals :any[];
  isActive = true;
  imageURL: string;
  applicationadd : FormGroup;
  unsavedChanges: boolean = false; // Track unsaved changes
     kyctypesdata = [
    {id:"1",kyctype:"Aadhar"},
    {id:"2",kyctype:"Pan"},
    {id:"3",kyctype:"Document1"},
    {id:"4",kyctype:"Document2"},
    {id:"5",kyctype:"Document3"}
  ]


  constructor(public tabService: TabService,public apidataservice : ApidataService,private formbuilder:FormBuilder ,private cdr: ChangeDetectorRef , private router: Router,private activatedRoute: ActivatedRoute) { }


    ngOnInit(): void {
      
      this.getappraisals = this.stateCtrl.valueChanges.pipe(   
        startWith(''),
        map((value:any) => value.length >= 1 ? this._filter(value || ''): []),
      );
      this.applicationadd = this.formbuilder.group({
        documentFile  :[null],
        applicationname  :[null,[Validators.required]],
        applicationnumber  :[null,[Validators.required, Validators.pattern(new RegExp("^[9,8,7,6]{1}[0-9]{9}$"))]],
        applicationage  :[null,[Validators.required]],
        kycdetails: this.formbuilder.array([this.addkycFormGroup()])
      });
       // Track form changes to set unsavedChanges flag
    this.applicationadd.valueChanges.subscribe(() => {
      this.unsavedChanges = this.applicationadd.dirty; // Set to true if the form is dirty
    });
    }
     


 addkycFormGroup(): FormGroup {
  return this.formbuilder.group({
    kyctypevalue: ['',Validators.required],
    documentno: ["", Validators.required],
    isaddressproof: [false, Validators.required],
  });
}
addRow() :void{
  (<FormArray>this.applicationadd.get("kycdetails")).push(
    this.addkycFormGroup()
  );
}
deleteRow(index :any) {
  (<FormArray>this.applicationadd.get("kycdetails")).removeAt(index);
}

 showPreview(event : any) {
  const file = event.target.files[0];
  // File Preview
  const reader = new FileReader();
  reader.onload = () => {
    this.imageURL = reader.result as string;
  }
  reader.readAsDataURL(file)
}
  resetimage(){
    this.imageURL = "";
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

  isFormDirty(): boolean {
    return this.unsavedChanges; // Adjust this according to your form's dirty status
  }

  nexttab(formgroup: FormGroup){

    const currentRoute = this.activatedRoute.snapshot;
    const currentState = this.router.routerState.snapshot;
    const nextState = this.router.routerState.snapshot; // Adjust as necessary
    // // Check if the form is invalid, and mark controls as touched if so.
    // if (formgroup.invalid) {
    //   alert(this.findInvalidControlsRecursive(formgroup));
    //   return formgroup.markAllAsTouched();
    // }

    // Here, use the canDeactivateGuard function before allowing the tab change.
  // Use the canDeactivateGuard function before allowing the tab change.
  const canDeactivate = canDeactivateGuard(this,currentRoute,currentState,nextState);

  // Handle Observable
  if (canDeactivate instanceof Observable) {
    canDeactivate.subscribe((result: boolean) => {
      if (result) {
        this.moveToNextTab();
      }
    });
  } 
  // Handle Promise
  else if (canDeactivate instanceof Promise) {
    canDeactivate.then((result: boolean) => {
      if (result) {
        this.moveToNextTab();
      }
    });
  } 
  // Handle direct boolean return
  else if (canDeactivate) {
    this.moveToNextTab();
  }
  }

  private moveToNextTab(): void {
    // Call the API or handle whatever logic needs to happen before changing the tab.
    this.tabService.setappraisalid(222222);
    this.tabelement.selectedIndex = this.number + 1; // Move to the next tab
    this.tabService.indexchangefromcomponet(this.number + 1); // Notify TabService
  }

public findInvalidControlsRecursive(formToInvestigate:FormGroup|FormArray):string[] {
  var invalidControls:string[] = [];
  let recursiveFunc = (form:FormGroup|FormArray) => {
    Object.keys(form.controls).forEach(field => { 
      const control = form.get(field);
      if (control?.invalid) invalidControls.push(field);
      if (control instanceof FormGroup) {
        recursiveFunc(control);
      } else if (control instanceof FormArray) {
        recursiveFunc(control);
      }        
    });
  }
  recursiveFunc(formToInvestigate);
  return invalidControls;
} 
    

  onseleteditem(object : any){
  this.isActive = false;
  }

}
