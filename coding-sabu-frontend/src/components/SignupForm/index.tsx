import { FC, useEffect, useCallback, memo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from '@emotion/styled';
import Modal from 'components/Modal';
import Input from 'components/Input';
import Button from 'components/Button';
import { createActionInvisibleAuthForm } from 'store/ui';
import { ThunkAsyncState } from 'store';
import { colors, media } from 'styles/theme';
import { flexCenter } from 'styles/module';
import { LoginInfo, SignupFormInfo, SignupInfo, User } from 'types';
import formValidationOptions from './formValidationOptions';
import { createActionLogin, createActionSignup } from 'store/auth';

const SignupButtonWrapper = styled.div`
  ${flexCenter}
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

const RadioContainer = styled.ol`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 1em auto;
  & > li {
    display: flex;
  }
`;

const RadioButton = styled.input`
  background-color: ${colors.white};
  &:checked {
    appearance: none;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 100%;
    margin-right: 0.1rem;
    background-color: ${colors.yellow[4]};
  }
`;

const RadioLabel = styled.label`
  font-size: 0.8rem;
`;

const InputError = styled.p`
  font-size: 0.7rem;
  font-weight: bold;
  color: ${colors.red[7]};
`;

interface Props {
  visibleAuthForm: boolean;
  setModalToRender: (modalType: 'login') => void;
  user: ThunkAsyncState<User>;
}

const SignupForm: FC<Props> = ({ visibleAuthForm, setModalToRender }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    clearErrors,
    watch,
    formState: { errors }
  } = useForm<SignupFormInfo>({ mode: 'onChange' });

  const password = useRef<string>('');
  password.current = watch('password', '');

  const isMatchPassword = (passwordCheck: string) =>
    passwordCheck === password.current || '비밀번호가 일치하지 않습니다.';

  const onSubmit: SubmitHandler<SignupFormInfo> = async ({
    passwordCheck,
    ...signupProps
  }) => {
    await dispatch(createActionSignup(signupProps as SignupInfo));

    await dispatch(
      createActionLogin({
        email: signupProps.email,
        password: signupProps.password
      } as LoginInfo)
    );
  };

  const closeSignupForm = useCallback(
    () => dispatch(createActionInvisibleAuthForm()),
    [dispatch]
  );

  useEffect(() => {
    return () => {
      clearErrors();
      setModalToRender('login');
    };
  }, [clearErrors, setModalToRender]);

  return (
    <Modal
      modalTitle="수련생 등록"
      visibleModal={visibleAuthForm}
      closeModal={closeSignupForm}
    >
      <div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            type="email"
            label="이메일"
            placeholder="example@email.com"
            {...register('email', formValidationOptions.email)}
          />
          {errors.email && <InputError>{errors.email.message}</InputError>}
          <Input
            label="비밀번호"
            type="password"
            placeholder="영문 대소문자, 숫자, 특수문자 포함(! @ # $)"
            {...register('password', formValidationOptions.password)}
          />
          {errors.password && (
            <InputError>{errors.password.message}</InputError>
          )}
          <Input
            type="password"
            label="비밀번호 확인"
            placeholder="비밀번호를 한번 더 입력해주세요."
            {...register('passwordCheck', {
              ...formValidationOptions.password,
              validate: { isMatchPassword }
            })}
          />
          {errors.passwordCheck && (
            <InputError>{errors.passwordCheck.message}</InputError>
          )}
          <Input
            type="text"
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
            {...register('nickname', formValidationOptions.nickname)}
          />
          {errors.nickname && (
            <InputError>{errors.nickname.message}</InputError>
          )}
          <Input
            type="text"
            label="전화번호"
            placeholder="010-0000-0000"
            {...register('phoneNum', formValidationOptions.phoneNum)}
          />
          {errors.phoneNum && (
            <InputError>{errors.phoneNum.message}</InputError>
          )}
          <Input
            type="text"
            label="자기소개"
            placeholder="자기소개를 입력해주세요."
            {...register('description', formValidationOptions.description)}
            height={5}
          />
          {errors.description && (
            <InputError>{errors.description.message}</InputError>
          )}
          <RadioContainer>
            <li>
              <RadioButton
                type="radio"
                value="student"
                id="student"
                defaultChecked
                {...register('userType')}
              />
              <RadioLabel htmlFor="student">학생입니다.</RadioLabel>
            </li>
            <li>
              <RadioButton
                type="radio"
                value="teacher"
                id="teacher"
                {...register('userType')}
              />
              <RadioLabel htmlFor="teacher">선생님입니다.</RadioLabel>
            </li>
          </RadioContainer>
          <SignupButtonWrapper>
            <Button type="submit" color="yellow" radius={5} height={2.5}>
              회원가입
            </Button>
            <Button
              color="white"
              radius={5}
              height={2.5}
              onClick={() => setModalToRender('login')}
            >
              뒤로
            </Button>
          </SignupButtonWrapper>
        </form>
      </div>
    </Modal>
  );
};

export default memo(SignupForm);
