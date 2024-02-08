import React, { InputHTMLAttributes, ReactNode, ReactText } from 'react';

export interface BalanceInputProps {
  value: ReactText;
  onUserInput: (input: string) => void;
  currencyValue?: ReactNode;
  placeholder?: string;
  innerRef?: React.RefObject<HTMLInputElement>;
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'placeholder' | 'onChange'
  >;
  isWarning?: boolean;
  isDisabled?: boolean;
  decimals?: number;
  unit?: string;
  switchEditingUnits?: () => void;
  className?: string;
}
