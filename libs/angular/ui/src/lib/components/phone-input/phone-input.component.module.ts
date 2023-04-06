import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LetModule } from '@rx-angular/template/let';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { LoadingModule } from '../loading';
import { PhoneInputComponent } from './phone-input.component';

@NgModule({
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
    PhoneInputComponent,
  ],
  exports: [PhoneInputComponent],
})
export class PhoneInputModule {}
