import { FC } from 'react';
import codingSabuAlert from 'assets/images/coding-sabu-alert.png';
import useRouting from 'hooks/useRouting';
import * as Styled from './NotFound.style';

const NotFound: FC = () => {
  const { back } = useRouting();

  return (
    <Styled.Container>
      <h2>요청하신 컨텐츠 혹은 페이지가 없습니다.</h2>
      <h4>올바른 자원을 요청해주세요.</h4>
      <img src={codingSabuAlert} alt="Not Found" />
      <Styled.ButtonToBack color="yellow" radius={5} height={3} onClick={back}>
        뒤로가기
      </Styled.ButtonToBack>
    </Styled.Container>
  );
};

export default NotFound;
