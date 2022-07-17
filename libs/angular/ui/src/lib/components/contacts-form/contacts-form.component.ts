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
  FormGroupDirective,
  NgControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { EnvToken, NOOP_VALUE_ACCESSOR } from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/config';
import { Contacts } from '@dehub/shared/model';
import { distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'dhb-contacts-form',
  template: `
    <form [formGroup]="contactsForm" class="p-fluid grid pt-2">
      <!-- Email -->
      <div class="field col-12 sm:col-5">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="fa-duotone fa-envelope"></i>
          </span>
          <span class="p-float-label">
            <input
              [formControlName]="'email'"
              type="text"
              id="email"
              autocomplete="email"
              pInputText
            />
            <label for="email" class="pr-5">Email Address</label>
          </span>
        </div>
      </div>

      <!-- Phone -->
      <div class="field col-12 sm:col-7 p-fluid">
        <dhb-phone-input
          [formControl]="contactsForm.controls.phone"
          [prefillData]="prefillData?.phone"
        ></dhb-phone-input>
      </div>
    </form>
  `,
  styles: [``],

  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class ContactsFormComponent implements OnInit, OnDestroy {
  @Input() prefillData?: Contacts;
  private sub?: Subscription;

  contactsForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
  });

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    @Inject(EnvToken) private env: SharedEnv,
    private fb: NonNullableFormBuilder
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
    if (this.prefillData) {
      this.contactsForm.patchValue(this.prefillData);
    }
    // Subscribe to form changes and emit on each change to the parent component.
    this.sub = this.contactsForm.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(contacts => {
        this.ngControl.control?.setValue(contacts);
        if (!this.contactsForm.valid) {
          this.ngControl.control?.setErrors({ contactsInvalid: true });
        }
      });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
