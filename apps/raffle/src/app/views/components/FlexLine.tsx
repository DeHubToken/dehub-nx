import classNames from 'classnames';
import React from 'react';

const FlexLine: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={classNames(`flex flex-column md:flex-row
        ${className}`)}
      style={{ paddingTop: '5px', paddingBottom: '5px' }}
      {...props}
    >
      {children}
    </div>
  );
};

export default FlexLine;
