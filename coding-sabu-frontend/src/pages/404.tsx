import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as Styled from 'styles/NotFound';

export default function NotFound() {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Not Found | 코딩사부</title>
      </Head>
      <Styled.Container>
        <h2>요청하신 컨텐츠 혹은 페이지가 없습니다.</h2>
        <h4>올바른 자원을 요청해주세요.</h4>
        <Image
          src="/images/coding-sabu-alert.png"
          alt="Not Found"
          layout="fixed"
          width={500}
          height={300}
        />
        <Styled.ButtonToBack color="yellow" radius={5} height={3} onClick={() => router.back()}>
          뒤로가기
        </Styled.ButtonToBack>
      </Styled.Container>
    </div>
  );
}
