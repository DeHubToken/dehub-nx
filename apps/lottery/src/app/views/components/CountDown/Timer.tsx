import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
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
        <div className="m-3 mr-1" {...props}>
          {days}d
        </div>
      )}
      {Boolean(hours) && (
        <div className="m-3 mr-1" {...props}>
          {hours}h
        </div>
      )}
      {Boolean(minutes) && (
        <div className="m-3 mr-1" {...props}>
          {minutes}m
        </div>
      )}
      {Boolean(seconds) && (
        <div className="m-3 mr-1" {...props}>
          {seconds}s
        </div>
      )}
    </StyledWrapper>
  );
};

export default Timer;
