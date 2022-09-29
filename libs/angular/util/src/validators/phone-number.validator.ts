import { AbstractControl, ValidatorFn } from '@angular/forms';
import { PhoneNumberUtil } from 'google-libphonenumber';

const phoneNumberUtil = PhoneNumberUtil.getInstance();

export const PhoneNumberValidator = (regionCode: {
  (): string | undefined;
}): ValidatorFn => {
  return (
    control: AbstractControl
  ): { wrongNumber: { [key: string]: string } } | null => {
    let validNumber = false;
    if (!control.value) {
      return null;
    }
    try {
      const phoneNumber = phoneNumberUtil.parseAndKeepRawInput(
        control.value.toString(),
        regionCode()
      );
      validNumber = phoneNumberUtil.isValidNumber(phoneNumber);
    } catch (e) {
      return { wrongNumber: { value: control.value } };
    }

    return validNumber ? null : { wrongNumber: { value: control.value } };
  };
};
