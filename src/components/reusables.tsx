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
