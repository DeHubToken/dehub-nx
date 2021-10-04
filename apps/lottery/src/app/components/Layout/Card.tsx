import React, { memo } from 'react';
import classNames from 'classnames';

const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  return (
    <div className={classNames(`card ${className}`)} {...props}>
      {children}
    </div>
  )
};

export default Card;