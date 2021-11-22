import styled from 'styled-components';

/* eslint-disable-next-line */
export interface ReactPcsuikitProps {}

const StyledReactPcsuikit = styled.div`
  color: pink;
`;

export function ReactPcsuikit(props: ReactPcsuikitProps) {
  return (
    <StyledReactPcsuikit>
      <h1>Welcome to ReactPcsuikit!</h1>
    </StyledReactPcsuikit>
  );
}

export default ReactPcsuikit;
