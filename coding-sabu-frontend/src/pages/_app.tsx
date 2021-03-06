import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

import type { AppProps } from 'next/app';
import { useStore } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import styled from '@emotion/styled';
import { injectStore } from 'apis/instance';
import GlobalNav from 'components/GlobalNav';
import HeadUpDisplay from 'components/HeadUpDisplay';
import Loader from 'components/Loader';
import { wrapper, StoreType } from 'store';
import GlobalStyle from 'styles/GlobalStyle';
import { sizes } from 'styles/modules/theme';

const Main = styled.main`
  width: calc(100% - 2rem);
  max-width: ${sizes.desktop}px;
  margin: ${sizes.unitBig / 8}em auto 2rem;
`;

function MyApp({ Component, pageProps }: AppProps) {
  const store: StoreType = useStore();
  injectStore(store);

  return (
    <PersistGate persistor={persistStore(store)} loading={<Loader loading={true} />}>
      <GlobalStyle />
      <GlobalNav />
      <Main>
        <Component {...pageProps} />
        <HeadUpDisplay />
      </Main>
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp);
