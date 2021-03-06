import Image from 'next/image';
import Link from 'next/link';
import { FcDisclaimer } from 'react-icons/fc';
import styled from '@emotion/styled';
import Button from 'components/Button';
import PageHead from 'components/PageHead';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
`;

export default function Error() {
  return (
    <Container>
      <PageHead title="오류" />
      <Wrapper>
        <Image src="/images/logo.svg" alt="코딩사부 로고" layout="fixed" width={500} height={300} />
        <h1>심각한 에러가 발생하였습니다.</h1>
        <FcDisclaimer />
        <Button color="black">
          <Link href="/" passHref>
            <a>홈으로 이동</a>
          </Link>
        </Button>
      </Wrapper>
    </Container>
  );
}

export const getStaticProps = () => {
  return {
    props: {}
  };
};
