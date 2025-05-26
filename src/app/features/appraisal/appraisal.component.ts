import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ApidataService } from '../../../../../AdithyaFrontEnd/src/app/core/services/apidata.service';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ListboxModule } from 'primeng/listbox';
import { CommonModule } from '@angular/common';
import { CanComponentDeactivate } from 'src/app/core/guards/auth.guard';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appraisal',
  templateUrl: './appraisal.component.html',
  styleUrls: ['./appraisal.component.css'],
  standalone: true, 
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    ListboxModule
  ] 
})
export class AppraisalComponent implements OnInit,CanComponentDeactivate{
  constructor( private formbuilder:FormBuilder,private apidataservice:ApidataService,private route: ActivatedRoute){console.log("Normal Loaded Module");}
  applicationqualification :any;
  applicationdocumenttypeId:any;
  items:any;
  cities1:any;
  applicationCountryTypes:any;
  applicationStateTypes:any;
  applicationDistrictTypes:any;
  imageURL: string;
  submitted = false;
  form: FormGroup;
  ngOnInit() {
    this.apidataservice.qualificationa.subscribe((items:any) => {
        this.applicationqualification = items;
    });

    this.apidataservice.documenttypes.subscribe((items:any) => {
      this.applicationdocumenttypeId = items;
    });

    this.apidataservice.hobbies.subscribe((items : any)=>{
      this.items = items;
    })

    this.cities1 = [
      {label:'Select City', value:null},
      {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
      {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
      {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
      {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
      {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
  ];
  
  this.applicationCountryTypes = this.route.snapshot.data['countries'];

  
  }

  selectedItems!: any[];

  selectAll = false;
   
  onSelectAllChange(event :any) {
      this.selectedItems = event.checked ? [...this.items] : [];
      this.selectAll = event.checked;
  }

  onChange(event : any) {
      const { originalEvent, value } = event
      if(value) this.selectAll = value.length === this.items.length;
  }


  appraisaladd = this.formbuilder.group({
    applicationname :[null,[Validators.required,Validators.minLength(4)]],
    applicationfathername :[null,[Validators.required,Validators.minLength(4)]],
    applicationmothername :[null,[Validators.required,Validators.minLength(4)]],
    applicationdob :[null,[Validators.required]],
    applicationgender :[null,[Validators.required]],
    applicationqualification :["",[Validators.required]],
    applicationmartialstatus :["",[Validators.required]],
    applicationmobile :[null,[Validators.required, Validators.pattern(new RegExp("^[9,8]{1}[0-9]{9}$"))]],
    applicationemail :[null,[Validators.required, Validators.pattern(new RegExp("^[a-zA-z0-9]*@[a-z]+[/.][a-z]{2,3}$"))]],
    applicationdocumenttypeId :["",[Validators.required]],
    applicationRequestedAmount  :[null,[Validators.required,Validators.pattern(new RegExp("^[0-9]+([.][0-9]{2})?$"))]],
    applicationHobbies  :[null,[Validators.required]],
    applicationRegisterdate  : [null,[Validators.required]],
    applicationAddress  :[null,[Validators.required]],
    applicationDistrictId  :["",[Validators.required]],
    applicationStateId  :["",[Validators.required]],
    applicationCountryId  :["",[Validators.required]],
    documentFile  :[null,[Validators.required]],
    applicationIsAcceptedTermsandConditions : [null,[Validators.requiredTrue]]
  })

  isFormDirty(): boolean {
    return this.appraisaladd.dirty; // Returns true if the form is dirty
  }

  submit(){
    alert(JSON.stringify(this.appraisaladd.value));
  }


  public getstates(countryid: any) {
    this.applicationStateTypes = null;
    this.applicationDistrictTypes = null;

    this.appraisaladd.controls['applicationStateId'].setValue("");
    if(countryid == "" || countryid == null){      
        return;
    }
    this.apidataservice.getstates().subscribe(
      (response :[] | any) => {
        this.applicationStateTypes = response.filter((obj:any) => {
          return obj.countryId === countryid;
        })       
      },
      (error : any) => {
        console.log('Something went wrong: ', error);
      }
    )
    }
    public getdistricts(stateid: any) {
      this.applicationDistrictTypes = null;
      this.appraisaladd.controls['applicationDistrictId'].setValue("");
      if(stateid == "" || stateid == null){      
        return;
      }
      this.apidataservice.getdistricts().subscribe(
        (response :[] | any) => {
          this.applicationDistrictTypes = response.filter((obj:any) => {
            return obj.stateId === stateid;
          })       
        },
        (error : any) => {
          console.log('Something went wrong: ', error);
        }
      )
    }
    onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.appraisaladd.invalid) {
        console.log(document.getElementsByClassName('ng-invalid'));
        alert(this.findInvalidControlsRecursive(this.appraisaladd));
        console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.appraisaladd.value, null, 4));
          return;
      }

      // display form values on success
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.appraisaladd.value, null, 4));
      console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.appraisaladd.value, null, 4));
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
  // Image Preview
  showPreview(event : any) {
    const file = event.target.files[0];
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }


}
