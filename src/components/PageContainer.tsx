import styled from "styled-components";

export const PageContainer = styled.div`
  grid-column: 2/-1;
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100dvh;
  background: #f3f4f6;
  transition: 0.4s ease;

  @media (max-width: 640px) {
    grid-column: 1 /-1;
  }
`;
