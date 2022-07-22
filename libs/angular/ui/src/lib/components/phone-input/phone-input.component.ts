import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import {
  ControlContainer,
  FormControlStatus,
  FormGroupDirective,
  NgControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { EnvToken, NOOP_VALUE_ACCESSOR } from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import { Country } from '@dehub/shared/model';
import {
  PhoneNumber,
  PhoneNumberFormat,
  PhoneNumberUtil,
} from 'google-libphonenumber';
import { distinctUntilChanged, Observable, Subscription, tap } from 'rxjs';
import { PhoneNumberValidator } from '../../validators/phone-number.validator';

@Component({
  selector: 'dhb-phone-input',
  template: `
    <div
      *ngIf="countries$ | async as countries; else loading"
      [formGroup]="phoneForm"
      class="grid grid-nogutter"
    >
      <!-- Country -->
      <div id="phone-code" class="col-fixed" style="width:80px">
        <span class="p-float-label">
          <p-dropdown
            [formControlName]="'code'"
            [inputId]="'code'"
            [options]="countries"
            [filter]="true"
            [filterBy]="'name'"
            [(ngModel)]="selectedCountryCode"
            [optionLabel]="'name'"
            [optionValue]="'code'"
            [required]="true"
            [autoDisplayFirst]="false"
            [styleClass]="'border-noround-right'"
            (ngModelChange)="onCountryChange($event, countries)"
          >
            <ng-template pTemplate="selectedItem">
              <div class="country-item country-item-value">
                <div *ngIf="selectedCountry">
                  {{ selectedCountry.phoneCode }}
                </div>
              </div>
            </ng-template>
            <ng-template let-country pTemplate="item">
              <div class="country-item">
                <div>{{ country.name }}</div>
              </div>
            </ng-template>
          </p-dropdown>
          <label for="code" class="pr-5">Code</label>
        </span>
      </div>

      <!-- Number -->
      <div id="phone-number" class="field col">
        <span class="p-float-label">
          <input
            id="number"
            type="number"
            autocomplete="phone"
            pInputText
            [formControlName]="'number'"
            [required]="true"
            class="border-noround-left"
          />
          <label for="number" class="pr-5">Phone Number</label>
        </span>
      </div>
    </div>

    <!-- Loading -->
    <ng-template #loading>
      <dhb-loading></dhb-loading>
    </ng-template>
  `,
  styles: [
    `
      #phone-code .country-item {
        min-width: 250px;
      }
      #phone-number {
        margin-left: -1px;
      }
      #phone-number input {
        -moz-appearance: textfield;
      }
      #phone-number input::-webkit-outer-spin-button,
      #phone-number input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class PhoneInputComponent implements OnInit, OnDestroy {
  @Input() prefillData?: string;

  private subs = new Subscription();
  path = this.env.baseUrl;

  phoneNumberUtil = PhoneNumberUtil.getInstance();

  countries$: Observable<Country[]> = this.httpClient
    .get<Country[]>(`${this.path}/assets/dehub/data/countries.json`)
    .pipe(tap(countries => this.prefillPhone(countries)));

  // Form
  selectedCountry?: Country;
  selectedCountryCode?: string;
  phoneForm = this.fb.group({
    code: [''],
    number: this.fb.control({ value: '', disabled: true }, [
      PhoneNumberValidator(() => this.selectedCountry?.code),
    ]),
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
    // Ref: https://stackoverflow.com/a/67096422/1617590
    this.phoneForm.setValidators(() =>
      Validators.required(this.phoneForm.controls.number)
    );

    this.subs.add(
      this.phoneForm.statusChanges
        .pipe(distinctUntilChanged())
        .subscribe((status: FormControlStatus) => {
          const country = this.selectedCountry;
          if (country) {
            const phoneNumber = new PhoneNumber();
            const numberControl = this.phoneForm.controls.number;
            phoneNumber.setCountryCode(parseInt(country.phoneCode));
            if (numberControl.value)
              phoneNumber.setNationalNumber(parseInt(numberControl.value));
            this.ngControl.control?.setValue(
              this.phoneNumberUtil.format(
                phoneNumber,
                PhoneNumberFormat.INTERNATIONAL
              )
            );
            if (status === 'INVALID') {
              this.ngControl.control?.setErrors({ phoneInvalid: true });
            }
          }
        })
    );
  }

  prefillPhone(countries: Country[]) {
    if (this.prefillData) {
      const phoneNumber = this.phoneNumberUtil.parse(this.prefillData);
      const phoneCode = `+${phoneNumber.getCountryCode()}`;

      this.selectedCountry = this.getCountryByPhoneCode(countries, phoneCode);

      if (this.selectedCountry) {
        this.selectedCountryCode = this.selectedCountry.code;
        this.phoneForm.patchValue({
          code: this.selectedCountry.code,
          number: phoneNumber.getNationalNumber()?.toString(),
        });
      }
    }
  }

  getCountryByCountryCode(countries: Country[], countryCode: string) {
    return countries.find(country => country.code === countryCode);
  }

  getCountryByPhoneCode(countries: Country[], phoneCode: string) {
    return countries.find(country => country.phoneCode === phoneCode);
  }

  onCountryChange(countryCode: string, countries: Country[]) {
    const country = this.getCountryByCountryCode(countries, countryCode);
    const numberControl = this.phoneForm.controls.number;
    if (country) {
      this.selectedCountry = country;
      numberControl.enable();
    } else {
      numberControl.disable();
    }
    this.phoneForm.updateValueAndValidity();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
