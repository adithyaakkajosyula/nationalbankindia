import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
    selector: '[appCustomValidator]', // Matches the `appCustomValidator` in the template
    standalone: true,
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: CustomValidatorDirective,
            multi: true,
        },
    ],
})
export class CustomValidatorDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
      const value = control.value;
      // Return an error object if the value is '0' (string) or 0 (number) or null
      return (value === '0' || value === 0 || value === null) 
        ? { valueinvalid: true }
        : null;
    }
  }
