import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  NgControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EnvToken, NOOP_VALUE_ACCESSOR } from '@dehub/angular/model';
import { Country, PhysicalAddress, SharedEnv } from '@dehub/shared/model';
import { PushModule } from '@rx-angular/template/push';
import { ButtonModule } from 'primeng/button';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  distinctUntilChanged,
  identity,
  startWith,
} from 'rxjs';

import { NgIf, NgTemplateOutlet } from '@angular/common';
import { LetModule } from '@rx-angular/template/let';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'dhb-address-form',
  standalone: true,
  imports: [
    // Angular
    NgTemplateOutlet,
    ReactiveFormsModule,
    NgIf,
    // PrimeNG
    FieldsetModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    // 3rd Party
    LetModule,
    PushModule,
  ],
  templateUrl: './address-form.component.html',
  styles: [
    `
      /* Issue ref: https://github.com/primefaces/primeng/issues/9741 */
      #country-select {
        .p-dropdown-filter {
          width: 100%;
        }
      }
    `,
  ],
  // Issue ref: https://github.com/primefaces/primeng/issues/9741
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class AddressFormComponent implements OnInit, OnDestroy {
  @Input() prefillData?: PhysicalAddress;
  @Output() readonly clear = new EventEmitter<void>();

  private sub?: Subscription;
  path = this.env.baseUrl;

  collapsedSubject = new BehaviorSubject(true);
  collapsed$ = this.collapsedSubject.asObservable();

  countries$: Observable<Country[]> = this.httpClient.get<Country[]>(
    `${this.path}/assets/dehub/data/countries.json`
  );

  // Form
  shippingAddressForm = this.fb.group({
    name: ['', Validators.required],
    line1: ['', Validators.required],
    line2: [''],
    city: ['', Validators.required],
    country: ['', Validators.required],
    postalCode: ['', Validators.required],
    state: ['', Validators.required],
  });

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    @Inject(EnvToken) private env: SharedEnv,
    private fb: NonNullableFormBuilder,
    private httpClient: HttpClient
  ) {
    if (this.ngControl) {
      // Note: we provide the value accessor through here, instead of
      // the `providers` to avoid running into a circular import.
      // And we use NOOP_VALUE_ACCESSOR so WrappedInput don't do anything with NgControl
      this.ngControl.valueAccessor = NOOP_VALUE_ACCESSOR;
    }
  }

  ngOnInit() {
    // Prefill form if provided
    if (this.prefillData) this.shippingAddressForm.patchValue(this.prefillData);

    // Subscribe to form changes and emit on each change to the parent component.
    this.sub = this.shippingAddressForm.valueChanges
      .pipe(
        this.prefillData ? startWith(this.prefillData) : identity,
        distinctUntilChanged()
      )
      .subscribe(shippingAddress => {
        this.ngControl.control?.setValue(shippingAddress);
        if (!this.shippingAddressForm.valid) {
          this.ngControl.control?.setErrors({ addressInvalid: true });
        }
      });
  }

  findCountry(countries: Country[], code: string) {
    return countries.find(country => country.code === code);
  }

  shippingAddressLabel() {
    const { name, line1, city } = this.shippingAddressForm.controls;
    if (name.value.concat(line1.value, city.value).length > 0) {
      return `${name.value} | ${line1.value} | ${city.value}...`;
    }
    return 'Shipping Details';
  }

  clearAddress() {
    this.shippingAddressForm.reset();
    this.collapsedSubject.next(true);
    this.clear.emit();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
