import React, { memo } from 'react';
import classNames from 'classnames';

const Box: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  return (
    <div className={classNames(`box ${className}`)} {...props}>
      {children}
    </div>
  )
};

export default Box;