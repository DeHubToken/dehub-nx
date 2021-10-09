import React, { memo } from 'react';
import classNames from 'classnames';

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

const Box = ({ className, children, ...props }: BoxProps) => {
  return (
    <div className={classNames(`box ${className ?? ''}`)} {...props}>
      {children}
    </div>
  )
};

export default Box;