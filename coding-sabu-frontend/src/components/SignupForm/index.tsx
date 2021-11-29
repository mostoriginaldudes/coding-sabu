import { FC, FormEventHandler } from 'react';
import styled from '@emotion/styled';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';
import { media } from 'styles/theme';

const SignupContainer = styled.div``;
const SignupFormElement = styled.form``;
const SignupEmailWrapper = styled.div`
  position: relative;
  & > button {
    font-size: 14px;
    height: 3em;
    position: absolute;
    top: 1em;
    right: 0;
    box-shadow: none;
    &:active,
    &:hover {
      box-shadow: none;
    }
  }
`;

const SignupButtonWrapper = styled.div`
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
  setRenderedModal: (renderedModal: 'login') => void;
}

const SignupForm: FC<Props> = ({ setRenderedModal }) => {
  const onSubmitTemp: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
  };
  const onChangeTemp = ({ target }: { target: HTMLInputElement }) =>
    console.log(target.value);

  return (
    <Modal modalTitle="수련생 등록">
      <SignupContainer>
        <SignupFormElement onSubmit={onSubmitTemp}>
          <SignupEmailWrapper>
            <Input type="email" label="이메일" onChange={onChangeTemp} />
            <Button color="black">중복 확인</Button>
          </SignupEmailWrapper>
          <Input label="비밀번호" type="password" onChange={onChangeTemp} />
          <Input
            label="비밀번호 확인"
            type="password"
            onChange={onChangeTemp}
          />
          <Input label="이름" name="name" type="text" onChange={onChangeTemp} />
          <Input
            label="닉네임"
            name="nickname"
            type="text"
            onChange={onChangeTemp}
          />
          <Input
            label="전화번호"
            type="number"
            max={2}
            onChange={onChangeTemp}
          />
          <Input
            label="자기소개"
            type="text"
            onChange={onChangeTemp}
            height={5}
          />
          <SignupButtonWrapper>
            <Button color="yellow" radius={5} height={2.5}>
              회원가입
            </Button>
            <Button
              color="white"
              radius={5}
              height={2.5}
              onClick={() => setRenderedModal('login')}
            >
              뒤로
            </Button>
          </SignupButtonWrapper>
        </SignupFormElement>
      </SignupContainer>
    </Modal>
  );
};

export default SignupForm;
