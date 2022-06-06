import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PhoneInputComponent } from './phone-input.component';

@NgModule({
  declarations: [PhoneInputComponent],
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // PrimeNg
    InputTextModule,
    DropdownModule,
  ],
  exports: [PhoneInputComponent],
})
export class PhoneInputModule {}
