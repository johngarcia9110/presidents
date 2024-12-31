import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    overflow: hidden;
    position: fixed;
    height: 100%;
    width: 100%;
    overscroll-behavior: none;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #0a1929;
    color: #e3e3e3;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0.5rem;
    color: #ffffff;
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.5;
  }

  button {
    cursor: pointer;
  }
`;
