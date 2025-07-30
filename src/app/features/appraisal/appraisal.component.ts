import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ApidataService } from '../../../../../NationalBankFrontEnd/src/app/core/services/apidata.service';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ListboxModule } from 'primeng/listbox';
import { CommonModule } from '@angular/common';
import { CanComponentDeactivate } from 'src/app/core/guards/auth.guard';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CustomValidatorDirective } from 'src/app/core/directives/custom-validator.directive';
import { conditionalRequiredDocumentFile } from 'src/app/core/validators/custom-validator';

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
    ListboxModule,
    CustomValidatorDirective
  ] 
})
export class AppraisalComponent implements OnInit,CanComponentDeactivate{
  constructor( private formbuilder:FormBuilder,private apidataservice:ApidataService,private router : Router){console.log("Normal Loaded Module");}
  applicationqualification :any;
  applicationdocumenttypes:any;
  hobbies:any;
  cities1:any;
  applicationCountryTypes:any;
  applicationStateTypes:any;
  applicationDistrictTypes:any;
  imageURL: string;
  existingFileURL: string | null = null;
  submitted = false;
  form: FormGroup;
  selectedFile: File | null = null;
  applications : any[] = [];
  ngOnInit() {
    this.appraisaladd.get('applicationCountryId')?.valueChanges.subscribe(value => {
    this.getstates(value);
    });

    this.appraisaladd.get('applicationStateId')?.valueChanges.subscribe(value => {
    this.getdistricts(value);
    });

    this.loadApplications();
    this.loadQualifications();
    this.loadDocuments();
    this.loadHobbies();
    this.loadCountries();
  
  }

  loadQualifications(){
    this.apidataservice.qualificationa.subscribe((items:any)=>{
        this.applicationqualification = items;
    })
  }
  loadDocuments(){
    this.apidataservice.documenttypes.subscribe((items:any)=>{
        this.applicationdocumenttypes = items;
    })
  }
  loadHobbies(){
    this.apidataservice.hobbies.subscribe((items:any)=>{
        this.hobbies = items;
    })
  }
  loadCountries(){
    this.apidataservice.getcountries().subscribe((items:any)=>{
        this.applicationCountryTypes = items;
    })
  }

  selectedItems!: any[];

  selectAll = false;
   
    onSelectAllChange(event :any) {
        this.selectedItems = event.checked ? [...this.hobbies] : [];
        this.selectAll = event.checked;
    }

    onChange(event : any) {
        const { originalEvent, value } = event
        if(value) this.selectAll = value.length === this.hobbies.length;
    }

    appraisaladd = this.formbuilder.group({
      id:[0],
      applicationname :["",[Validators.required,Validators.minLength(4)]],
      applicationfathername :["",[Validators.required,Validators.minLength(4)]],
      applicationmothername :["",[Validators.required,Validators.minLength(4)]],
      applicationdob :[new Date(),[Validators.required]],
      applicationgender :["",[Validators.required]],
      applicationqualification :["",[Validators.required]],
      applicationmartialstatus :["",[Validators.required]],
      applicationmobile :["",[Validators.required, Validators.pattern(new RegExp("^[9,8]{1}[0-9]{9}$"))]],
      applicationemail :["",[Validators.required, Validators.pattern(new RegExp("^[a-zA-z0-9]*@[a-z]+[/.][a-z]{2,3}$"))]],
      applicationdocumenttypeId :[0,[Validators.required]],
      applicationRequestedAmount  :[0,[Validators.required,Validators.pattern(new RegExp("^[0-9]+([.][0-9]{2})?$"))]],
      applicationHobbies  :[[],[Validators.required]],
      applicationRegisterdate  : [new Date(),[Validators.required]],
      applicationAddress  :["",[Validators.required]],
      applicationDistrictId  :[0,[Validators.required]],
      applicationStateId  :[0,[Validators.required]],
      applicationCountryId  :[0,[Validators.required]],
      documentFile  :["",[conditionalRequiredDocumentFile ]],
      applicationIsAcceptedTermsandConditions : [true,[Validators.requiredTrue]]
    })

    isFormDirty(): boolean {
      return this.appraisaladd.dirty; // Returns true if the form is dirty
    }

    public getstates(countryid: any) {
    this.applicationStateTypes = null;
    this.applicationDistrictTypes = null;

    this.appraisaladd.controls['applicationStateId'].setValue(0);
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
      this.appraisaladd.controls['applicationDistrictId'].setValue(0);
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

    onSubmit(form: FormGroup) {
            if(form.valid){
              
              const model = this.appraisaladd.value;
              const formData = new FormData();

              formData.append('Id', model.id?.toString() ?? '0');
              formData.append('ApplicationName', model.applicationname ?? '');
              formData.append('ApplicationFatherName', model.applicationfathername ?? '');
              formData.append('ApplicationMotherName', model.applicationmothername ?? '');
              formData.append('ApplicationDob', model.applicationdob ? new Date(model.applicationdob).toISOString() : '');
              formData.append('ApplicationGender', model.applicationgender ?? '');
              formData.append('ApplicationQualification', model.applicationqualification ?? '');
              formData.append('ApplicationMartialStatus', model.applicationmartialstatus ?? '');
              formData.append('ApplicationMobile', model.applicationmobile?.toString() ?? '');
              formData.append('ApplicationEmail', model.applicationemail ?? '');
              formData.append('ApplicationRequestedAmount', model.applicationRequestedAmount?.toString() ??'');
              formData.append('ApplicationRegisterDate', model.applicationRegisterdate ? new Date(model.applicationRegisterdate).toISOString() : '');
              formData.append('ApplicationIsAcceptedTermsAndConditions', model.applicationIsAcceptedTermsandConditions == true ?'true': 'false');
              formData.append('ApplicationAddress', model.applicationAddress ?? '');
              formData.append('ApplicationDistrictId', model.applicationDistrictId?.toString() ?? '0');
              formData.append('ApplicationStateId', model.applicationStateId?.toString() ?? '0');
              formData.append('ApplicationCountryId', model.applicationCountryId?.toString() ?? '0');

              const selectedCountry = this.applicationCountryTypes.find((c : any) => c.id === model.applicationCountryId);
              formData.append('ApplicationCountryName', selectedCountry?.countryname ?? '');

              if (Array.isArray(model.applicationHobbies)) {
                (model.applicationHobbies as string[]).forEach((hobby: any, index: number) => {
                  formData.append(`ApplicationHobbies[${index}]`, hobby?.hobbietype ?? hobby ?? '');
                });
              }
              if (this.selectedFile) {
              formData.append('DocumentFile', this.selectedFile);
            }

            this.apidataservice.createApplication(formData).subscribe((data) => {
              if (data.isSuccess) {
                Swal.fire({
                  title: 'Success!',
                  text: data.message,
                  icon: 'success',
                  confirmButtonText: 'OK'
                }).then(() => {
                  location.reload();
                });
              } else {
                Swal.fire({
                  title: 'Error!',
                  text: data.message,
                  icon: 'error',
                  confirmButtonText: 'OK'
                });
              }
            });
        }
        else{
          this.displayValidationErrors(form)
        }
      
    }

    displayValidationErrors(formGroup: FormGroup) {
      Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormGroup) {
          this.displayValidationErrors(control);
        } else {
          control?.markAsTouched({ onlySelf: true });
        }
      });
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
      this.selectedFile = file;
      // File Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      }
      reader.readAsDataURL(file)
    }
      // Helper method to reset the form and model
    resetForm(form: FormGroup): void {
        this.appraisaladd.reset();       
    }

    loadApplications() {
    this.apidataservice.getApplications().subscribe(response => {
      this.applications = response; // Store response
    });  
    }

    onEdit(id: number) {
  
      this.apidataservice.getApplicationById(id).subscribe(
        (user) => {

          const selectedHobbies = this.hobbies.filter((hobby: any) =>
            user.applicationHobbies.includes(hobby.hobbietype)
          );
            this.selectAll = selectedHobbies.length === this.hobbies.length;

            this.appraisaladd.patchValue({
                      id: user.id,
                      applicationname: user.applicationName,
                      applicationfathername: user.applicationFatherName,
                      applicationmothername: user.applicationMotherName,
                      applicationdob: new Date(user.applicationDob),
                      applicationgender: user.applicationGender,
                      applicationqualification: user.applicationQualification,
                      applicationmartialstatus: user.applicationMartialStatus,
                      applicationmobile: user.applicationMobile,
                      applicationemail: user.applicationEmail,
                      applicationdocumenttypeId: user.applicationDocumentTypeId,
                      applicationRequestedAmount: user.applicationRequestedAmount,
                      applicationHobbies: selectedHobbies,
                      applicationRegisterdate: new Date(user.applicationRegisterDate),
                      applicationAddress: user.applicationAddress,
                      applicationCountryId: user.applicationCountryId,                     
                      applicationStateId: user.applicationStateId,    
                      applicationDistrictId: user.applicationDistrictId,                   
                      applicationIsAcceptedTermsandConditions: user.applicationIsAcceptedTermsAndConditions,
                      documentFile :''
                    });
                      
          
        },
        (error) => {
          Swal.fire({
            title: 'Error!',
            text: error.message, // Error message
            icon: 'error', // Show error icon
            confirmButtonText: 'OK'
          });
        }
      );
    }
    viewDocument(): void {
            const id : number = this.appraisaladd.value.id as number;

            this.apidataservice.viewFile(id).subscribe({
          next: (fileBlob) => {
            const fileURL = URL.createObjectURL(fileBlob);
            const a = document.createElement('a');
            a.href = fileURL;
            a.target = '_blank'; // Opens in new tab
            a.click();
            URL.revokeObjectURL(fileURL); // Clean up
          },
          error: (err) => {
            if (err.status === 404) {
               this.router.navigate(['/document-not-found']);;
            } else {
              alert('Error retrieving document.');
            }
          }
        });
    }


}

