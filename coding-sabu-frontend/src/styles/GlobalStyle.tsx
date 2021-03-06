import { Global, css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';
import { colors } from './modules/theme';

const style = css`
  ${emotionNormalize}

  * {
    box-sizing: border-box;
    font-family: 'D2Coding';
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
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }
  input {
    outline: none;
    border: none;
    padding: 0;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    &[type='number'] {
      -moz-appearance: textfield;
    }
  }

  :root {
    --element-gap: 10px;
  }
`;

const GlobalStyle = () => {
  return <Global styles={style} />;
};

export default GlobalStyle;
