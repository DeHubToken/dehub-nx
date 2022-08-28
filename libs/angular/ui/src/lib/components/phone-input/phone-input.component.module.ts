import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LetModule } from '@rx-angular/template';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { LoadingModule } from '../loading';
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

    // Lib
    LoadingModule,

    // Rx Angular,
    LetModule,
  ],
  exports: [PhoneInputComponent],
})
export class PhoneInputModule {}
