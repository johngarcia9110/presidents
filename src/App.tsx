import { useState, useCallback, useEffect } from "react";
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
  padding: 32px 16px;
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

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const App = () => {
  const [appState, setAppState] = useState<AppState>(AppState.SELECT_COUNT);
  const [selectedPresidents, setSelectedPresidents] = useState(presidents);

  const handleCountSubmit = useCallback((count: number) => {
    // Shuffle the presidents array and take the first 'count' elements
    const randomPresidents = shuffleArray(presidents).slice(0, count);
    setSelectedPresidents(randomPresidents);
    setAppState(AppState.VIEWING_FEED);
  }, []);

  const handleFeedComplete = () => {
    setAppState(AppState.COMPLETED);
  };

  const handleRestart = () => {
    setAppState(AppState.SELECT_COUNT);
    setSelectedPresidents(presidents);
  };

  //   useEffect(() => {
  //     handleCountSubmit(10);
  //   }, [handleCountSubmit]);

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
            presidents={selectedPresidents}
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
