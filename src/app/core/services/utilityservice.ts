
import { FormControl,FormGroup,FormBuilder, Validators, FormArray } from '@angular/forms';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApplicationRegisterModel } from 'src/app/models/applicationRegister';
@Injectable()
export class UtilityService{

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
  private dataSubject = new BehaviorSubject<any>([]);
  data$ = this.dataSubject.asObservable();

  updateData(newData: any) {
    const currentData = this.dataSubject.getValue();
    const updatedData = [...currentData, newData];
    this.dataSubject.next(updatedData);
  }
}
