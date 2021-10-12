import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  div:last-of-type {
    margin-right: 0;
  }
`;

interface TimerProps {
  minutes?: number;
  hours?: number;
  days?: number;
}

const Timer = ({ minutes, hours, days }: TimerProps) => {
  return (
    <StyledWrapper>
      {Boolean(days) && <h1 className="m-3 mr-1">{days}d</h1>}
      {Boolean(hours) && <h1 className="m-3 mr-1">{hours}h</h1>}
      {Boolean(minutes) && <h1 className="m-3 mr-1">{minutes}m</h1>}
    </StyledWrapper>
  );
};

export default Timer;
