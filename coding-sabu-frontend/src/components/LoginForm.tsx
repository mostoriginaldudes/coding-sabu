import { useEffect, useCallback, FC } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from 'utils/FormValidation/auth/ValidationSchema';

import Modal from 'components/Modal';
import Input from 'components/Input';
import Button from 'components/Button';

import { ThunkAsyncState } from 'store';
import { login } from 'store/auth';
import { hideAuthForm } from 'store/ui';

import { LoginInfo, User } from 'types';

import { ButtonContainer, InputError } from 'styles/LoginForm';

import useScrollLock from 'hooks/useScrollLock';

interface Props {
  visibleAuthForm: boolean;
  setModalToRender: (modalType: 'signup') => void;
  user: ThunkAsyncState<User>;
}

const LoginForm: FC<Props> = ({ visibleAuthForm, setModalToRender, user }) => {
  useScrollLock(visibleAuthForm, [visibleAuthForm]);

  const {
    register,
    handleSubmit,
    clearErrors,
    setFocus,
    formState: { errors }
  } = useForm<LoginInfo>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema.getLogin())
  });

  const dispatch = useDispatch();

  const closeLoginForm = useCallback(() => dispatch(hideAuthForm()), [dispatch]);

  const onSubmit: SubmitHandler<LoginInfo> = useCallback(
    async loginInfo => await dispatch(login(loginInfo)),
    [dispatch]
  );

  useEffect(() => {
    visibleAuthForm && setFocus('email');
    return () => {
      clearErrors();
    };
  }, [visibleAuthForm, setFocus, clearErrors]);

  return (
    <Modal modalTitle="로그인" visibleModal={visibleAuthForm} closeModal={closeLoginForm}>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            type="email"
            label="이메일"
            placeholder="example@email.com"
            {...register('email')}
          />
          {errors.email && <InputError>{errors.email.message}</InputError>}
          <Input
            type="password"
            label="비밀번호"
            placeholder="영문 대소문자, 숫자, 특수문자 포함(! @ # $)"
            {...register('password')}
          />
          {errors.password && <InputError>{errors.password.message}</InputError>}
          <ButtonContainer>
            <Button color="yellow" radius={10} height={2.5}>
              로그인
            </Button>
            <Button
              color="black"
              radius={10}
              height={2.5}
              onClick={() => setModalToRender('signup')}
            >
              회원가입
            </Button>
          </ButtonContainer>
        </form>
      </div>
    </Modal>
  );
};

export default LoginForm;