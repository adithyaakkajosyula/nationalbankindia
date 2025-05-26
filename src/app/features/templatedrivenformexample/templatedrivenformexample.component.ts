import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationRegisterModel } from 'src/app/models/applicationRegister';
import { ApidataService } from 'src/app/core/services/apidata.service';
import { FormsModule, NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { from } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ListboxModule } from 'primeng/listbox';
import Swal from 'sweetalert2';
import { CustomValidatorDirective } from 'src/app/core/directives/custom-validator.directive';
import { UtilityService } from 'src/app/core/services/utilityservice';


@Component({
  selector: 'app-templatedrivenformexample',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDatepickerModule, MatNativeDateModule, ListboxModule, CustomValidatorDirective],
  templateUrl: './templatedrivenformexample.component.html',
  styleUrls: ['./templatedrivenformexample.component.css']
})
export class TemplatedrivenformexampleComponent implements OnInit{
  
  window = window;
  model: ApplicationRegisterModel = {
    applicationName: '',
    applicationFatherName: '',
    applicationMotherName: '',
    applicationDob: new Date(),
    applicationGender: '',
    applicationQualification: '',
    applicationMartialStatus: '',
    applicationMobile: '',
    applicationEmail: '',
    applicationDocumentTypeId:0,
    applicationRequestedAmount: 0,
    applicationHobbies: [],
    applicationRegisterDate: new Date(),
    applicationIsAcceptedTermsAndConditions: false,
    applicationAddress: '',
    applicationDistrictId: 0,
    applicationStateId: 0,
    applicationCountryName: '',
    applicationCountryId: 0,
    id:0,
    isSuccess:true,
    message: '',
    applicantDocumentTypes: [],
    countryTypes: [],
    stateTypes: [],
    districtTypes: [],
    applicationDocumentUploadModel: { documentUploadId: 0, documentName: '', documentTypeId: 0 }
  };
  iconClass = 'bi bi-arrow-bar-right';
  slideleft: string = '-400px'; // Initial position of the inner box

  togglediv() {
    // Toggle the position of the inner box
    this.iconClass = this.iconClass === 'bi bi-arrow-bar-left' ? 'bi bi-arrow-bar-right' : 'bi bi-arrow-bar-left';
    this.slideleft = this.slideleft === '-400px' ? '0px' : '-400px';
  }
  
  applications: ApplicationRegisterModel[] = [];
  
  qualifications : string[]=[];
  documents:string[] = [];
  countries:string[] = [];
  states:string[] = [];
  districts : string[] = [];

   martialstatusoptions= [
    {value:'Single', label:'Single'},
    {value:'Married',label:'Married'}
  ]

//#region  HobbiiesSelction
hobbies:string[] = [];
selectAll = false;

onSelectAllChange(event: any) {
    this.model.applicationHobbies = event.checked ? [...this.hobbies] : [];
    this.selectAll = event.checked;
}

onChange(event : any) {
  
    const { originalEvent, value } = event
    if(value) this.selectAll = value.length === this.hobbies.length; 
    this.model.applicationHobbies = value;
}
//#endregion


  constructor(private apidataservice : ApidataService, private dataService: UtilityService){}

  ngOnInit(): void {
    this.loadApplications();
    this.loadQualifications();
    this.loadDocuments();
    this.loadHobbies();
    this.loadCountries();
    //this.model.id > 0 ? (this.getStates(this.model.applicationCountryId), this.getDistricts(this.model.applicationStateId)) : '';
  }

  loadApplications() {
    this.apidataservice.getApplications().subscribe(response => {
      this.applications = response; // Store response
    });
  }
  loadQualifications(){
    this.apidataservice.qualificationa.subscribe((items:any)=>{
        this.qualifications = items;
    })
  }
  loadDocuments(){
    this.apidataservice.documenttypes.subscribe((items:any)=>{
        this.documents = items;
    })
  }
  loadHobbies(){
    this.apidataservice.hobbies.subscribe((items:any)=>{
        this.hobbies = items;
    })
  }
  loadCountries(){
    this.apidataservice.getcountries().subscribe((items:any)=>{
        this.countries = items;
    })
  }
  getStates(countryId:any){
    // if (countryId === "0") {
    //   // Reset the state of the control to pristine and untouched
    //   countryField.control.markAsDirty();   
    //   countryField.control.setErrors({ invalidCountry: true });     
    //   countryField.control.markAsTouched();
      
    // }
    this.model.applicationStateId = 0;
    this.model.applicationDistrictId = 0;
    this.states = [];
    this.districts = [];
    this.apidataservice.getstates().subscribe((states : any)=>{
        this.states = states.filter((obj : any)=>{
          return obj.countryId == countryId
        })
    })
  }
  getDistricts(stateId : any){
    this.model.applicationDistrictId = 0;
    this.districts = [];
    this.apidataservice.getdistricts().subscribe((districts : any)=>{
      this.districts = districts.filter((obj : any)=>{
        return obj.stateId == stateId
      })
    })
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.model.documentFile = input.files[0];
    } else {
      this.model.documentFile = null;
    }
  }
  onSubmit(form: NgForm) {
    console.log(form);
    if (form.valid) {
  
      // Add primitive fields to the FormData object
      const formData = new FormData();
      formData.append('Id', this.model.id.toString());
      formData.append('ApplicationName', this.model.applicationName);
      formData.append('ApplicationFatherName', this.model.applicationFatherName);
      formData.append('ApplicationMotherName', this.model.applicationMotherName);
      formData.append('ApplicationDob', this.model.applicationDob.toISOString()); // Ensure date is in ISO format
      formData.append('ApplicationGender', this.model.applicationGender);
      formData.append('ApplicationQualification', this.model.applicationQualification);
      formData.append('ApplicationMartialStatus', this.model.applicationMartialStatus);
      formData.append('ApplicationMobile', this.model.applicationMobile.toString());
      formData.append('ApplicationEmail', this.model.applicationEmail);
      formData.append('ApplicationRequestedAmount', this.model.applicationRequestedAmount.toString());
      formData.append('ApplicationRegisterDate', this.model.applicationRegisterDate.toISOString());
      formData.append('ApplicationIsAcceptedTermsAndConditions', this.model.applicationIsAcceptedTermsAndConditions.toString());
      formData.append('ApplicationAddress', this.model.applicationAddress);
      formData.append('ApplicationDistrictId', this.model.applicationDistrictId.toString());
      formData.append('ApplicationStateId', this.model.applicationStateId.toString());
      formData.append('ApplicationCountryId', this.model.applicationCountryId.toString());
      formData.append('ApplicationCountryName', this.model.applicationCountryName || '');
  
      // Add arrays (e.g., hobbies) as individual items
      this.model.applicationHobbies.forEach((hobby:any, index) => {
        formData.append(`ApplicationHobbies[${index}]`, hobby.hobbietype);
      });
  
      // Add file if available
      if (this.model.documentFile instanceof File) {
        formData.append('DocumentFile', this.model.documentFile);
      }

      // Submit the form data based on the action (add or update)
        this.apidataservice.createApplication(formData).subscribe((data) => {
          if (data.isSuccess) {
            Swal.fire({
              title: 'Success!',
              text: data.message, // Success message
              icon: 'success', // Show success icon
              confirmButtonText: 'OK'
            }).then(() => {
              // Reset the form after success
              this.loadApplications();
              this.resetForm(form);
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: data.message, // Error message
              icon: 'error', // Show error icon
              confirmButtonText: 'OK'
            });
          }
        });
    } 
    else {
      // Return validation messages
      this.displayValidationErrors(form);
    }
  }
  onEdit(id: number) {

    this.apidataservice.getApplicationById(id).subscribe(
      (user) => {
        this.model = { ...user };
        this.model.applicationDob = this.model.applicationDob instanceof Date
        ? this.model.applicationDob
        : new Date(this.model.applicationDob);

        this.model.applicationRegisterDate = this.model.applicationRegisterDate instanceof Date
        ? this.model.applicationRegisterDate
        : new Date(this.model.applicationRegisterDate);

        this.model.applicationHobbies = this.hobbies.filter((hobby : any) => {
        return this.model.applicationHobbies.includes(hobby.hobbietype)});
        this.selectAll = this.model.applicationHobbies.length == this.hobbies.length ? true : false;
        
        if (this.model.id > 0) {
          this.apidataservice.getstates().subscribe((states : any)=>{
            this.states = states.filter((obj : any)=>{
              return obj.countryId == this.model.applicationCountryId
            })
        });
        this.apidataservice.getdistricts().subscribe((districts : any)=>{
          this.districts = districts.filter((obj : any)=>{
            return obj.stateId == this.model.applicationStateId
          })
        });
        }
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
  
  // Helper method to reset the form and model
resetForm(form: NgForm): void {
  this.model = this.resetModel()
  form.resetForm();         
}

// Method to mark controls as touched to show validation errors
displayValidationErrors(form: NgForm): void {
  Object.keys(form.controls).forEach((field) => {
    const control = form.controls[field];
    control.markAsTouched({ onlySelf: true });  //
  });
}


resetModel(): ApplicationRegisterModel {
  return {
    applicationName: '',
    applicationFatherName: '',
    applicationMotherName: '',
    applicationDob: new Date(),
    applicationGender: '',
    applicationQualification: '',
    applicationMartialStatus: '',
    applicationMobile: '',
    applicationEmail: '',
    applicationDocumentTypeId:0,
    applicationRequestedAmount: 0,
    applicationHobbies: [],
    applicationRegisterDate: new Date(),
    applicationIsAcceptedTermsAndConditions: false,
    applicationAddress: '',
    id :0,
    isSuccess : true,
    message : '',
    applicationDistrictId: 0,
    applicationStateId: 0,
    applicationCountryName: '',
    applicationCountryId: 0,
    applicantDocumentTypes: [],
    countryTypes: [],
    stateTypes: [],
    districtTypes: [],
    applicationDocumentUploadModel: { documentUploadId: 0, documentName: '', documentTypeId: 0 }
  };
}
gettextvalue(a:any){
  alert(a);
}

}
