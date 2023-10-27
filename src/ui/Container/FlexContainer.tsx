import styled from "styled-components";


export const FlexContainer = styled.div<{$vertical?: boolean}>`
  padding: 1.4rem;
  display: flex;
  flex-direction: ${props => props.$vertical ? "row" : "column"};

  gap: 1rem;
`;