import Head from 'next/head';
import { FC } from 'react';

interface Props {
  title: string;
  imgUrl?: string;
}

const PageHead: FC<Props> = ({ title, imgUrl = '/images/logo.svg' }) => {
  return (
    <Head>
      <title>{title} | 코딩사부</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={`${title} - 코딩사부`} />
      <meta property="og:url" content={location.origin} />
      <meta property="og:description" content={`${title} 페이지 입니다.`} />
      <meta property="og:image" content={imgUrl} />
    </Head>
  );
};

export default PageHead;
