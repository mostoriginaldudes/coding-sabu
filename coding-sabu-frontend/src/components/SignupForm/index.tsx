import { useEffect, useCallback, FC, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Modal from 'components/Modal';
import Input from 'components/Input';
import Button from 'components/Button';
import { LoginInfo, SignupFormInfo, SignupInfo, User } from 'types';
import { ThunkAsyncState } from 'store';
import { login, signup } from 'store/auth';
import { hideAuthForm } from 'store/ui';
import validationSchema from 'utils/FormValidation/auth/ValidationSchema';
import useScrollLock from 'hooks/useScrollLock';
import * as Styled from './SignupForm.style';

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
    setFocus,
    formState: { errors }
  } = useForm<SignupFormInfo>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema.getSignup())
  });

  const onSubmit: SubmitHandler<SignupFormInfo> = async ({ passwordCheck, ...signupProps }) => {
    await dispatch(signup(signupProps as SignupInfo));
    await dispatch(
      login({
        email: signupProps.email,
        password: signupProps.password
      } as LoginInfo)
    );
  };

  const closeSignupForm = useCallback(() => {
    setModalToRender('login');
    dispatch(hideAuthForm());
  }, [dispatch, setModalToRender]);

  const openLoginForm = useCallback(() => {
    setModalToRender('login');
  }, [setModalToRender]);

  useScrollLock(visibleAuthForm, [visibleAuthForm]);

  useEffect(() => {
    visibleAuthForm && setFocus('email');
    return () => {
      clearErrors();
    };
  }, [setFocus, clearErrors, visibleAuthForm]);

  return (
    <Modal modalTitle="수련생 등록" visibleModal={visibleAuthForm} closeModal={closeSignupForm}>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            type="email"
            label="이메일"
            placeholder="example@email.com"
            {...register('email')}
          />
          {errors.email && <Styled.InputError>{errors.email.message}</Styled.InputError>}
          <Input
            label="비밀번호"
            type="password"
            placeholder="영문 대소문자, 숫자, 특수문자 포함(! @ # $)"
            {...register('password', { deps: ['passwordCheck'] })}
          />
          {errors.password && <Styled.InputError>{errors.password.message}</Styled.InputError>}
          <Input
            type="password"
            label="비밀번호 확인"
            placeholder="비밀번호를 한번 더 입력해주세요."
            {...register('passwordCheck', { deps: ['password'] })}
          />
          {errors.passwordCheck && (
            <Styled.InputError>{errors.passwordCheck.message}</Styled.InputError>
          )}
          <Input
            type="text"
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
            {...register('nickname')}
          />
          {errors.nickname && <Styled.InputError>{errors.nickname.message}</Styled.InputError>}
          <Input
            type="text"
            label="전화번호"
            placeholder="010-0000-0000"
            {...register('phoneNum')}
          />
          {errors.phoneNum && <Styled.InputError>{errors.phoneNum.message}</Styled.InputError>}
          <Input
            type="text"
            label="자기소개"
            placeholder="자기소개를 입력해주세요."
            {...register('description')}
            height={5}
          />
          {errors.description && (
            <Styled.InputError>{errors.description.message}</Styled.InputError>
          )}
          <Styled.RadioContainer>
            <li>
              <Styled.RadioButton
                type="radio"
                value="student"
                id="student"
                defaultChecked
                {...register('userType')}
              />
              <Styled.RadioLabel htmlFor="student">수련생입니다.</Styled.RadioLabel>
            </li>
            <li>
              <Styled.RadioButton
                type="radio"
                value="teacher"
                id="teacher"
                {...register('userType')}
              />
              <Styled.RadioLabel htmlFor="teacher">사부님입니다.</Styled.RadioLabel>
            </li>
          </Styled.RadioContainer>
          <Styled.SignupButtonWrapper>
            <Button type="submit" color="yellow" radius={5} height={2.5}>
              회원가입
            </Button>
            <Button type="button" color="white" radius={5} height={2.5} onClick={openLoginForm}>
              뒤로
            </Button>
          </Styled.SignupButtonWrapper>
        </form>
      </div>
    </Modal>
  );
};

export default memo(SignupForm);
