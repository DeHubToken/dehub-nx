import React, { ReactNode, ReactText } from 'react';
import { InputHTMLAttributes } from 'react';

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
  decimals?: number;
  unit?: string;
  switchEditingUnits?: () => void;
}