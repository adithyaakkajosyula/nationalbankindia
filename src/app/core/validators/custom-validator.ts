import { AbstractControl, ValidationErrors } from '@angular/forms';

export function conditionalRequiredDocumentFile(control: AbstractControl): ValidationErrors | null {
  if (!control.parent) return null;

  const id = control.parent.get('id')?.value;
  const documentFile = control.value;

  // Only require document file if creating new (id === 0 or null)
  if ((id === 0 || id === null || id === undefined) && (!documentFile || documentFile === '')) {
    return { required: true };
  }

  return null;
}
