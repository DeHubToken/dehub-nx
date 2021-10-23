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
      {Boolean(days) && <div {...props}>{days}d&nbsp;</div>}
      {Boolean(hours) && <div {...props}>{hours}h&nbsp;</div>}
      {Boolean(minutes) && <div {...props}>{minutes}m&nbsp;</div>}
      {Boolean(seconds) && <div {...props}>{seconds}s&nbsp;</div>}
    </StyledWrapper>
  );
};

export default Timer;
