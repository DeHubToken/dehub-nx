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
      {Boolean(days) && <div {...props}>{days}d&nbsp;</div>}
      {<div {...props}>{`${hours}`.padStart(2, '0')}h&nbsp;</div>}
      {<div {...props}>{`${minutes}`.padStart(2, '0')}m&nbsp;</div>}
      {<div {...props}>{`${seconds}`.padStart(2, '0')}s&nbsp;</div>}
    </StyledWrapper>
  );
};

export default Timer;
