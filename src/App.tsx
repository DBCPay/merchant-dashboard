import "./App.css";
import Router from "./routes/Route";
import styled from "styled-components";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider>
      <AppContainer>
        <Router />
      </AppContainer>
    </MantineProvider>
  );
}

const AppContainer = styled.div`
  width: 100%;
  height: 100dvh;
  display: grid;
  grid-template-columns: minmax(70px, min-content) 1fr;
  grid-auto-rows: 100%;
  // background: var(--background-white);
  background: var(--white);
  transition: 0.4s ease;
  position: relative;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export default App;
