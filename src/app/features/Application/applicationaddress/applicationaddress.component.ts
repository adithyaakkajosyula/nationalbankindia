
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataProviderDirective } from '../../../../../../NationalBankFrontEnd/src/app/core/directives/data-provider.directive';
import { TabService } from '../../../../../../NationalBankFrontEnd/src/app/core/services/tab.service';
import { Subject, Observable, filter, map, startWith, switchMap, mergeMap, debounceTime, distinctUntilChanged, tap, EMPTY, of } from 'rxjs';
import { FormControl,FormGroup,FormBuilder, Validators, FormArray, ValidatorFn, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { ApidataService } from '../../../../../../NationalBankFrontEnd/src/app/core/services/apidata.service';
import { UtilityService } from '../../../../../../NationalBankFrontEnd/src/app/core/services/utilityservice';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-applicationaddress',
  templateUrl: './applicationaddress.component.html',
  styleUrls: ['./applicationaddress.component.css'],
  standalone: true, // This marks it as a standalone component
  imports: [CommonModule,ReactiveFormsModule] 
})
export class ApplicationaddressComponent  implements OnInit{
  @Input() tab : any;
  @Input() number:number;
  @Input() tabelement : any;
  applicationid : any;
  applicationaddressadd : FormGroup;
  checkCtrl = new FormControl('');
  constructor(public dataProvider: DataProviderDirective, public tabService: TabService,private formbuilder:FormBuilder,public utilityservice :UtilityService) { 

    }

ngOnInit(): void {
 

  this.applicationaddressadd = this.formbuilder.group({
    isSameAddressControl:[false],
      applicationaddid  :[null,[Validators.required]],
      currentaddress: this.formbuilder.group({
      applicationaddhouseno  :[null,[Validators.required]],
      applicationaddstreetname  :[null,[Validators.required]],
      applicationaddcolonyorarea  :[null,[Validators.required]],
      applicationaddlandmark  :[null,[Validators.required]],
      applicationaddvillagetownorcity  :[null,[Validators.required]],
      applicationaddmandal  :[null,[Validators.required]],
      applicationadddistrict  :[null,[Validators.required]],
      applicationaddpincode  :[null,[Validators.required]],
    }),
    permanentaddress:this.formbuilder.group({
      permanentapplicationaddhouseno  :[null],
      permanentapplicationaddstreetname  :[null],
      permanentapplicationaddcolonyorarea  :[null],
      permanentapplicationaddlandmark  :[null],
      permanentapplicationaddvillagetownorcity  :[null],
      permanentapplicationaddmandal  :[null],
      permanentapplicationadddistrict  :[null],
      permanentapplicationaddpincode  :[null],
    }
    , {
      validators: [this.atLeastOneFieldValidator()]
    }
    
    )
  });
  this.tabService.getapplicationid.subscribe(a=>  this.applicationaddressadd.controls.applicationaddid.setValue(a))

  this.applicationaddressadd.get("isSameAddressControl")?.valueChanges.subscribe((change)=>{
    if(change){ 
        
      let currentAddressChanges = this.applicationaddressadd.get('currentaddress')?.value;
        this.applicationaddressadd.get("permanentaddress")?.patchValue({
          permanentapplicationaddhouseno:currentAddressChanges.applicationaddhouseno,
          permanentapplicationaddstreetname:currentAddressChanges.applicationaddstreetname,
          permanentapplicationaddcolonyorarea:currentAddressChanges.applicationaddcolonyorarea,
          permanentapplicationaddlandmark:currentAddressChanges.applicationaddlandmark,
          permanentapplicationaddvillagetownorcity:currentAddressChanges.applicationaddvillagetownorcity,
          permanentapplicationaddmandal:currentAddressChanges.applicationaddmandal,
          permanentapplicationadddistrict:currentAddressChanges.applicationadddistrict,
          permanentapplicationaddpincode:currentAddressChanges.applicationaddpincode
        });
        const permanentAddressControls = (this.applicationaddressadd.controls["permanentaddress"] as FormGroup)?.controls;

        if (permanentAddressControls) {
          Object.keys(permanentAddressControls).forEach((controlName) => {
            // Access individual controls here
            const control = permanentAddressControls[controlName];
            control.setValidators(Validators.required);
            control.updateValueAndValidity();
          });
        }
    }
    else
    {
      const permanentAddressControls = (this.applicationaddressadd.controls["permanentaddress"] as FormGroup)?.controls;
        
        if (permanentAddressControls) {
          Object.keys(permanentAddressControls).forEach((controlName) => {
            // Access individual controls here
            const control = permanentAddressControls[controlName];
            control.reset();
            control.clearValidators();
            control.updateValueAndValidity();
          });
        }
    }
    
    return EMPTY;
  });

  this.applicationaddressadd.get('permanentaddress')?.valueChanges.subscribe(value => {
     
  });
}

  nexttab(formgroup : FormGroup){
      if (formgroup.invalid) {  
       console.log(JSON.stringify(this.utilityservice.findInvalidControlsRecursive(this.applicationaddressadd)));  
        return formgroup.markAllAsTouched();
      
     }
      else {
      //your api call
     this.tabService.setappraisalid(222222);
     this.tabelement.selectedIndex = this.number+1;
     this.tabService.indexchangefromcomponet(this.number + 1);
    }
  }
  previoustab(){
    this.tabelement.selectedIndex = this.number-1;
    this.tabService.indexchangefromcomponet(this.number - 1);
  }
  public readonly cellPhoneValidator: ValidatorFn = c => {
    return  this.applicationaddressadd.get("isSameAddressControl")?.value === true ? Validators.required(c) : Validators.nullValidator(c);
  }
    // Custom validator to ensure at least one field is entered
    atLeastOneFieldValidator() {
      return (control: AbstractControl): { [key: string]: boolean } | null => {
        const values = Object.values(control.value);
        const hasValue = values.some(val => !!val);
        return hasValue ? null : { 'atLeastOneField': true };
      };
    }
}
