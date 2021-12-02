import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  div:last-of-type {
    margin-right: 0;
  }
`;

interface TimerProps extends React.HTMLAttributes<HTMLDivElement> {
  seconds?: number;
  minutes?: number;
  hours?: number;
  days?: number;
}

const Timer = ({ seconds, minutes, hours, days, ...props }: TimerProps) => {
  return (
    <StyledWrapper {...props}>
      {Boolean(days) && (
        <div {...props} className="pr-1">
          {`${days}`.padStart(2, '0')}
          <small>d</small>
        </div>
      )}
      {
        <div {...props} className="pr-1">
          {`${hours}`.padStart(2, '0')}
          <small>h</small>
        </div>
      }
      {
        <div {...props} className="pr-1">
          {`${minutes}`.padStart(2, '0')}
          <small>m</small>
        </div>
      }
      {
        <div {...props} className="pr-1">
          {`${seconds}`.padStart(2, '0')}
          <small>s</small>
        </div>
      }
    </StyledWrapper>
  );
};

export default Timer;
