import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          href="http://cdn.jsdelivr.net/gh/joungkyun/font-d2coding@1.3.2/d2coding.css"
          rel="stylesheet"
          type="text/css"
        />
        <link rel="stylesheet" href="https://uicdn.toast.com/editor/2.0.0/toastui-editor.min.css" />
        <link rel="stylesheet" href="/globals.css" />
      </Head>
      <body>
        <Main />
        <div id="modal"></div>
        <NextScript />
      </body>
    </Html>
  );
}
