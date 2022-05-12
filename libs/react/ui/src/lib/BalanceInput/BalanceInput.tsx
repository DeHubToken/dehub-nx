import React from 'react';
import { Text } from '../Text';
import { StyledBalanceInput, StyledInput, UnitContainer } from './styles';
import { BalanceInputProps } from './types';

const BalanceInput = ({
  value,
  onUserInput,
  currencyValue,
  placeholder = '0.0',
  innerRef,
  inputProps,
  isWarning = false,
  isDisabled = false,
  decimals = 18,
  unit,
  ...props
}: BalanceInputProps) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      onUserInput(e.currentTarget.value.replace(/,/g, '.'));
    }
  };

  return (
    <StyledBalanceInput data-is-warning={isWarning} {...props}>
      <div className="flex align-items-center justify-content-end">
        <StyledInput
          pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
          inputMode="decimal"
          minLength={1}
          maxLength={80}
          min="0"
          value={value}
          onChange={handleOnChange}
          placeholder={placeholder}
          ref={innerRef}
          disabled={isDisabled}
          {...inputProps}
        />
        {unit && <UnitContainer>{unit}</UnitContainer>}
      </div>
      {currencyValue && (
        <Text fontSize="14px" textAlign="right" color="">
          {currencyValue}
        </Text>
      )}
    </StyledBalanceInput>
  );
};

export default BalanceInput;
