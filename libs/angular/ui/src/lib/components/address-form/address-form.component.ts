import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgControl,
  Validators,
} from '@angular/forms';
import { EnvToken, NOOP_VALUE_ACCESSOR } from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import { Country, PhysicalAddress } from '@dehub/shared/model';
import { distinctUntilChanged, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'dhb-address-form',
  template: `
    <form [formGroup]="shippingAddressForm" class="p-fluid grid pt-2">
      <!-- Name -->
      <div class="field col-12">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="fa-duotone fa-user-crown"></i>
          </span>
          <span class="p-float-label">
            <input
              [formControlName]="'name'"
              type="text"
              id="name"
              autocomplete="name"
              pInputText
            />
            <label for="name" class="pr-5">Name</label>
          </span>
        </div>
      </div>

      <!-- Line1 -->
      <div class="field col-12 sm:col-6">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="fa-duotone fa-map-location-dot"></i>
          </span>
          <span class="p-float-label">
            <input
              [formControlName]="'addressLine1'"
              type="text"
              id="address-line1"
              autocomplete="address-line1"
              pInputText
            />
            <label for="address-line1" class="pr-5">Address</label>
          </span>
        </div>
      </div>

      <!-- Line2 -->
      <div class="field col-12 sm:col-6">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="fa-duotone fa-map-location-dot"></i>
          </span>
          <span class="p-float-label">
            <input
              [formControlName]="'addressLine2'"
              type="text"
              id="address-line2"
              autocomplete="address-line2"
              pInputText
            />
            <label for="address-line2" class="pr-5">
              Apt., suite, etc. (optional)
            </label>
          </span>
        </div>
      </div>

      <!-- City -->
      <div class="field col-12 sm:col-6">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="fa-duotone fa-city"></i>
          </span>
          <span class="p-float-label">
            <input
              [formControlName]="'city'"
              type="text"
              id="city"
              autocomplete="address-level2"
              pInputText
            />
            <label for="city" class="pr-5">City</label>
          </span>
        </div>
      </div>

      <!-- Country -->
      <div class="field col-12 sm:col-6">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="fa-duotone fa-mailbox"></i>
          </span>
          <span class="p-float-label">
            <p-dropdown
              *ngIf="countries$ | async as countries"
              id="country-select"
              [formControlName]="'country'"
              [inputId]="'country'"
              [options]="countries"
              [filter]="true"
              [filterBy]="'name'"
              [(ngModel)]="selectedCountryCode"
              [optionLabel]="'name'"
              [optionValue]="'code'"
              [required]="true"
              [autoDisplayFirst]="false"
              [styleClass]="'flex w-full border-noround-left'"
            >
              <ng-template pTemplate="selectedItem">
                <div
                  class="country-item country-item-value"
                  *ngIf="selectedCountryCode"
                >
                  <div>
                    {{ findCountry(countries, selectedCountryCode)?.name }}
                  </div>
                </div>
              </ng-template>
              <ng-template let-country pTemplate="item">
                <div class="country-item">
                  <div>{{ country.name }}</div>
                </div>
              </ng-template>
            </p-dropdown>
            <label for="country" class="pr-5">Country</label>
          </span>
        </div>
      </div>

      <!-- Postal code -->
      <div class="field col-12 sm:col-6">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="fa-duotone fa-mailbox"></i>
          </span>
          <span class="p-float-label">
            <input
              [formControlName]="'zip'"
              type="text"
              id="zip"
              autocomplete="postal-code"
              pInputText
            />
            <label for="zip" class="pr-5">ZIP Code</label>
          </span>
        </div>
      </div>

      <!-- State -->
      <div class="field col-12 sm:col-6">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="fa-duotone fa-flag"></i>
          </span>
          <span class="p-float-label">
            <input
              [formControlName]="'state'"
              type="text"
              id="state"
              autocomplete="address-level1"
              pInputText
            />
            <label for="state" class="pr-5">
              State, county, province, etc.
            </label>
          </span>
        </div>
      </div>
    </form>
  `,
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
  private sub?: Subscription;
  path = this.env.baseUrl;

  countries$: Observable<Country[]> = this.httpClient.get<Country[]>(
    `${this.path}/assets/dehub/data/countries.json`
  );

  // Form
  selectedCountryCode?: string;
  shippingAddressForm = new FormGroup({
    name: new FormControl(undefined, Validators.required),
    addressLine1: new FormControl(undefined, Validators.required),
    addressLine2: new FormControl(undefined),
    city: new FormControl(undefined, Validators.required),
    country: new FormControl(undefined, Validators.required),
    zip: new FormControl(undefined, Validators.required),
    state: new FormControl(undefined, Validators.required),
  });

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    @Inject(EnvToken) private env: SharedEnv,
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
    // Subscribe to form changes and emit on each change to the parent component.
    this.sub = this.shippingAddressForm.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((v: PhysicalAddress) => {
        this.ngControl.control?.setValue(v);
        if (!this.shippingAddressForm.valid) {
          this.ngControl.control?.setErrors({ addressInvalid: true });
        }
      });
  }

  findCountry(countries: Country[], code: string) {
    return countries.find(country => country.code === code);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
