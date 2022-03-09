import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import styled from '@emotion/styled';
import store from 'store';
import GlobalNav from 'components/GlobalNav';
import HeadUpDisplay from 'components/HeadUpDisplay';
import GlobalStyle from 'styles/GlobalStyle';
import { sizes } from 'styles/modules/theme';
import { injectStore } from 'apis/instance';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const Main = styled.main`
  width: calc(100% - 2rem);
  max-width: ${sizes.desktop}px;
  margin: ${sizes.unitBig / 8}em auto 2rem;
`;

injectStore(store);
const persistor = persistStore(store);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <GlobalStyle />
        <GlobalNav />
        <Main>
          <Component {...pageProps} />
          <HeadUpDisplay />
        </Main>
      </PersistGate>
    </Provider>
  );
}
