import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LetModule, PushModule } from '@rx-angular/template';
import { ButtonModule } from 'primeng/button';
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
    ButtonModule,

    // Rx Angular,
    LetModule,
    PushModule,
  ],
  exports: [AddressFormComponent],
})
export class AddressFormModule {}
