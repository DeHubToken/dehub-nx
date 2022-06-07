import { MouseEvent, PropsWithChildren } from 'react';

export type AlertTheme = {
  background: string;
};

export const variants = {
  INFO: 'info',
  DANGER: 'danger',
  SUCCESS: 'success',
  WARNING: 'warning',
} as const;

export type Variants = typeof variants[keyof typeof variants];

export interface AlertProps extends PropsWithChildren<unknown> {
  variant?: Variants;
  title: string;
  onClick?: (evt: MouseEvent<HTMLButtonElement>) => void;
}
