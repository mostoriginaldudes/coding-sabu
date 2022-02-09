import { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import codingSabuAlert from 'assets/images/coding-sabu-alert.png';
import { colors } from 'styles/theme';
import Button from 'components/Button';

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
  const history = useHistory();
  const backToPreviousPage = useCallback(() => history.goBack(), [history]);

  return (
    <Container>
      <h2>요청하신 컨텐츠가 없습니다.</h2>
      <h4>올바른 컨텐츠를 요청해주세요.</h4>
      <img src={codingSabuAlert} alt="Not Found" />
      <ButtonToBack
        color="yellow"
        radius={5}
        height={3}
        onClick={backToPreviousPage}
      >
        뒤로가기
      </ButtonToBack>
    </Container>
  );
};

export default NotFound;
