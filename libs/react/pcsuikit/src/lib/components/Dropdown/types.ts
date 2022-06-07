import { PropsWithChildren } from 'react';

export type Position = 'top' | 'top-right' | 'bottom';

export interface PositionProps extends PropsWithChildren<unknown> {
  position?: Position;
}

export interface DropdownProps extends PositionProps {
  target: React.ReactElement;
}
