import { ControlValueAccessor } from '@angular/forms';

// Ref: https://stackoverflow.com/a/65177817/1617590
export const NOOP_VALUE_ACCESSOR: ControlValueAccessor = {
  writeValue(): void {},
  registerOnChange(): void {},
  registerOnTouched(): void {},
};
