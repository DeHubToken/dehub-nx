import classNames from 'classnames';
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <div className={classNames(`card ${className ?? ''}`)} {...props}>
      {children}
    </div>
  );
};

export default Card;
