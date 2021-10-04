import React, { memo } from 'react';
import classNames from 'classnames';

const FlexLine: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  return (
    <div className={
      classNames(`flex flex-column md:flex-row justify-content-between
        ${className}`)}
      style={{ paddingTop: '5px', paddingBottom: '5px' }}
      {...props}
    >
      {children}
    </div>
  )
};

export default FlexLine;