import { FC, useState, useCallback } from 'react';
import Modal from '../Modal';
import Input from '../Input';
import styled from '@emotion/styled';
import Button from 'components/Button';
import { media } from 'styles/theme';

const LoginFormContainer = styled.div``;

const LoginFormElement = styled.form``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  & > button {
    width: 100%;
    &:first-of-type {
      margin-right: 10px;
    }
  }
  ${media.tablet`
    flex-direction: column;
    justify-content: flex-start;
    & > button {
      &:first-of-type {
        margin: 2em 0 ;
      }
    }
  `}
`;

interface Props {
  setRenderedModal: (renderedModal: 'signup') => void;
}

const LoginForm: FC<Props> = ({ setRenderedModal }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const submitHandler = useCallback(event => {
    event.preventDefault();
  }, []);

  const updateEmail = useCallback(
    ({ target }: { target: HTMLInputElement }) => setEmail(target.value),
    [setEmail]
  );
  const updatePassword = useCallback(
    ({ target }: { target: HTMLInputElement }) => setPassword(target.value),
    [setPassword]
  );

  return (
    <Modal modalTitle="로그인">
      <LoginFormContainer>
        <LoginFormElement onSubmit={submitHandler}>
          <Input
            type="email"
            name="email"
            label="email"
            value={email}
            onChange={updateEmail}
          />
          <Input
            type="password"
            name="password"
            label="password"
            value={password}
            onChange={updatePassword}
          />
          <ButtonContainer>
            <Button color="yellow" radius={10} height={2.5}>
              로그인
            </Button>
            <Button
              color="black"
              radius={10}
              height={2.5}
              onClick={() => setRenderedModal('signup')}
            >
              회원가입
            </Button>
          </ButtonContainer>
        </LoginFormElement>
      </LoginFormContainer>
    </Modal>
  );
};

export default LoginForm;
