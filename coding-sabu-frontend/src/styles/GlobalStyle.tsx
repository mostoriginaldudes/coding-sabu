import { Global, css } from "@emotion/react";
import { colors } from "./theme";
import emotionNormalize from "emotion-normalize";

const style = css`
  @font-face {
    font-family: "D2Coding";
    src: url("../assets/fonts/D2Coding.ttf") format("truetype");
  }

  ${emotionNormalize}
  html,
  body {
    box-sizing: border-box;
    font-family: "D2Coding";
  }
  a {
    text-decoration: none;
    color: ${colors.black};
  }
  ul,
  ol {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }
`;

const GlobalStyle = () => {
  return <Global styles={style} />;
};

export default GlobalStyle;
