import { FC } from 'react';
import styled from '@emotion/styled';
import codingSabuAlert from 'assets/images/coding-sabu-alert.png';
import { colors } from 'styles/theme';
import Button from 'components/Button';
import useRouting from 'hooks/useRouting';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > h4 {
    color: ${colors.yellow[5]};
    text-decoration: underline;
  }
`;

const ButtonToBack = styled(Button)`
  font-weight: bold;
  width: 10em;
`;

const NotFound: FC = () => {
  const { back } = useRouting();

  return (
    <Container>
      <h2>요청하신 컨텐츠 혹은 페이지가 없습니다.</h2>
      <h4>올바른 자원을 요청해주세요.</h4>
      <img src={codingSabuAlert} alt="Not Found" />
      <ButtonToBack color="yellow" radius={5} height={3} onClick={back}>
        뒤로가기
      </ButtonToBack>
    </Container>
  );
};

export default NotFound;
