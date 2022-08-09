import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LetModule } from '@rx-angular/template';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { AddressFormComponent } from './address-form.component';

@NgModule({
  declarations: [AddressFormComponent],
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // PrimeNg
    InputTextModule,
    DropdownModule,
    FieldsetModule,

    // Rx Angular,
    LetModule,
  ],
  exports: [AddressFormComponent],
})
export class AddressFormModule {}
