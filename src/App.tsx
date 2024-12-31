import { useState } from "react";
import styled from "styled-components";
import { SelectPresidentsCount } from "./components/SelectPresidentsCount";
import { PresidentFeed } from "./components/PresidentFeed";
import { EndScreen } from "./components/EndScreen";
import { presidents } from "./data/presidents";
import { GlobalStyles } from "./styles/GlobalStyles";

const AppContainer = styled.div`
  min-height: 100vh;
  height: 100vh;
  background-color: #0a1929;
  padding: 64px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

enum AppState {
  SELECT_COUNT,
  VIEWING_FEED,
  COMPLETED,
}

export const App = () => {
  const [appState, setAppState] = useState<AppState>(AppState.SELECT_COUNT);
  const [selectedCount, setSelectedCount] = useState<number>(0);

  const handleCountSubmit = (count: number) => {
    setSelectedCount(count);
    setAppState(AppState.VIEWING_FEED);
  };

  const handleFeedComplete = () => {
    setAppState(AppState.COMPLETED);
  };

  const handleRestart = () => {
    setAppState(AppState.SELECT_COUNT);
    setSelectedCount(0);
  };

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        {appState === AppState.SELECT_COUNT && (
          <SelectPresidentsCount
            totalPresidents={presidents.length}
            onSubmit={handleCountSubmit}
          />
        )}
        {appState === AppState.VIEWING_FEED && (
          <PresidentFeed
            presidents={presidents.slice(0, selectedCount)}
            onComplete={handleFeedComplete}
          />
        )}
        {appState === AppState.COMPLETED && (
          <EndScreen onRestart={handleRestart} />
        )}
      </AppContainer>
    </>
  );
};
