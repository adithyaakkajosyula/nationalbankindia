// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe, LowerCasePipe, PercentPipe, UpperCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs'; // Import MatTabsModule
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {CdkListbox, CdkOption} from '@angular/cdk/listbox';
import { ListboxModule } from 'primeng/listbox';
import { DataProviderDirective } from '../directives/data-provider.directive';
@NgModule({
  declarations: [
    DataProviderDirective
  ],
  imports: [
  ],
  exports: [
    DataProviderDirective
  ]
})
export class SharedModule {}