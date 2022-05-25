import React, { cloneElement, ReactElement } from 'react';
import { scales, variants } from '../Button/types';
import StyledButtonMenu from './StyledButtonMenu';
import { ButtonMenuProps } from './types';

const ButtonMenu: React.FC<ButtonMenuProps> = ({
  activeIndex = 0,
  scale = scales.MD,
  variant = variants.PRIMARY,
  onItemClick,
  children,
}) => {
  return (
    <StyledButtonMenu variant={variant}>
      {React.Children.map(
        children as ReactElement | ReactElement[],
        (child: ReactElement, index) => {
          return cloneElement(child, {
            isActive: activeIndex === index,
            onClick: onItemClick ? () => onItemClick(index) : undefined,
            scale,
            variant,
          });
        }
      )}
    </StyledButtonMenu>
  );
};

export default ButtonMenu;
