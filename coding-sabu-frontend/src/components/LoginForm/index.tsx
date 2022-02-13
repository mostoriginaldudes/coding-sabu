import { FC, useCallback, useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import Modal from 'components/Modal';
import Input from 'components/Input';
import Button from 'components/Button';
import { ThunkAsyncState } from 'store';
import { createActionLogin } from 'store/auth';
import { createActionInvisibleAuthForm } from 'store/ui';
import { LoginInfo, User } from 'types';
import formValidationOptions from './formValidationOptions';
import { ButtonContainer, InputError } from './LoginForm.style';

interface Props {
  visibleAuthForm: boolean;
  setModalToRender: (modalType: 'signup') => void;
  user: ThunkAsyncState<User>;
}

const LoginForm: FC<Props> = ({ visibleAuthForm, setModalToRender, user }) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors }
  } = useForm<LoginInfo>({ mode: 'onChange' });

  const dispatch = useDispatch();

  const closeLoginForm = useCallback(
    () => dispatch(createActionInvisibleAuthForm()),
    [dispatch]
  );

  const onSubmit: SubmitHandler<LoginInfo> = loginInfo => {
    dispatch(createActionLogin(loginInfo));
  };

  useEffect(() => {
    return () => {
      clearErrors();
    };
  }, [clearErrors]);

  return (
    <Modal
      modalTitle="로그인"
      visibleModal={visibleAuthForm}
      closeModal={closeLoginForm}
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
            type="password"
            label="비밀번호"
            placeholder="영문 대소문자, 숫자, 특수문자 포함(! @ # $)"
            {...register('password', formValidationOptions.password)}
          />
          {errors.password && (
            <InputError>{errors.password.message}</InputError>
          )}
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

export default memo(LoginForm);
