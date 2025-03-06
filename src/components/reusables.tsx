import styled from "styled-components";

export const BodyDiv = styled.div`
  height: calc(100dvh - 124px);

  @media (min-width: 340px) {
    height: calc(100dvh - 133px);
  }

  @media (min-width: 640px) {
    height: calc(100dvh - 57px);
  }

  @media (min-width: 768px) {
    height: calc(100dvh - 65px);
  }

  @media (min-width: 1024px) {
    height: calc(100dvh - 73px);
  }
`;

export const DashboardTableLayoutDiv = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;

  @media (min-width: 768px) {
    overflow: hidden;
  }
`;

// w-full flex-1 overflow-auto md:overflow-hidden flex flex-col gap-4 no-scrollbar
