import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PhoneInputModule } from '../phone-input/phone-input.component.module';
import { ContactsFormComponent } from './contacts-form.component';

@NgModule({
  declarations: [ContactsFormComponent],
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Lib
    PhoneInputModule,

    // PrimeNg
    InputTextModule,
    DropdownModule,
  ],
  exports: [ContactsFormComponent],
})
export class ContactsFormModule {}
