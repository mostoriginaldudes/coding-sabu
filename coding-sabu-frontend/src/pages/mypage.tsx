import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback, useMemo, ChangeEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from 'components/Input';
import Button from 'components/Button';
import PageHead from 'components/PageHead';
import AUTH_FAIL from 'fixtures/auth/fail';
import useRedux from 'hooks/useRedux';
import { editUser } from 'store/auth';
import { showHud } from 'store/ui';
import validationSchema from 'utils/FormValidation/auth/ValidationSchema';
import * as Styled from 'styles/MyPage';
import { EditUserInfo } from 'types';

export default function MyPage() {
  const router = useRouter();

  const { useAppDispatch, useAppSelector } = useRedux();
  const dispatch = useAppDispatch();
  const { data: user, error } = useAppSelector(state => state.auth.user);

  const [imgUrl, setImgUrl] = useState<string | undefined>(user?.profileImage);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const hasBeenUploaded = useMemo(() => user?.profileImage !== '', [user]);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors }
  } = useForm<EditUserInfo>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema.getEditUser()),
    defaultValues: {
      id: user?.id,
      email: user?.email,
      nickname: user?.nickname,
      phoneNum: user?.phoneNum,
      description: user?.description
    }
  });

  const onSubmit: SubmitHandler<EditUserInfo> = async (newInfo, event) => {
    event?.preventDefault();

    if (user) {
      const formData = new FormData();
      formData.append('id', String(user.id));
      formData.append('email', user.email);
      formData.append('password', newInfo.password);
      formData.append('nickname', newInfo.nickname);
      formData.append('phoneNum', newInfo.phoneNum);
      formData.append('description', newInfo.description);
      formData.append('profileImage', profileImage as unknown as string);
      await dispatch(editUser(formData));

      if (error === null) {
        movePreviousPage();
      }
    }
  };

  const uploadProfile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files![0];
      if (file) {
        const profileImgUrl = URL.createObjectURL(file);
        setProfileImage(file);
        setImgUrl(profileImgUrl);
      }
    },
    [setImgUrl]
  );

  const checkIfLoggedIn = useCallback(() => {
    if (!user) {
      dispatch(showHud(AUTH_FAIL.REQUIRED_LOGIN));
      movePreviousPage();
    }
  }, [user]);

  const movePreviousPage = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    checkIfLoggedIn();
  }, [user]);

  useEffect(() => {
    return () => {
      clearErrors();
      imgUrl && URL.revokeObjectURL(imgUrl);
    };
  }, [clearErrors, imgUrl]);

  return (
    <div>
      <PageHead title="??? ??????" />
      <form onSubmit={handleSubmit(onSubmit)} noValidate encType="multipart/form-data">
        <Styled.Row>
          <Styled.ProfileContainer imgUrl={imgUrl}>
            {hasBeenUploaded && <label htmlFor="profileImage">????????? ?????? ?????????</label>}
            <Styled.ProfileInput
              type="file"
              id="profileImage"
              placeholder="????????? ??????"
              accept="image/*"
              onChange={uploadProfile}
            />
          </Styled.ProfileContainer>
          <Styled.InputContainer>
            <Input
              type="email"
              label="?????????"
              placeholder="example@email.com"
              onChange={() => {}}
              value={user?.email}
              readOnly
              disabled
            />
            {errors.email && <Styled.InputError>{errors.email.message}</Styled.InputError>}
            <Input
              label="??? ???????????? (???????????? ?????? ????????? ?????? ????????????)"
              type="password"
              placeholder="?????? ????????????, ??????, ???????????? ??????(! @ # $)"
              {...register('password', { deps: ['passwordCheck'] })}
            />
            {errors.password && <Styled.InputError>{errors.password.message}</Styled.InputError>}
            <Input
              type="password"
              label="???????????? ??????"
              placeholder="??????????????? ?????? ??? ??????????????????."
              {...register('passwordCheck', { deps: ['password'] })}
            />
            {errors.passwordCheck && (
              <Styled.InputError>{errors.passwordCheck.message}</Styled.InputError>
            )}
          </Styled.InputContainer>
        </Styled.Row>
        <div>
          <Input
            type="text"
            label="?????????"
            placeholder="???????????? ??????????????????."
            {...register('nickname')}
          />
          {errors.nickname && <Styled.InputError>{errors.nickname.message}</Styled.InputError>}
          <Input
            type="text"
            label="????????????"
            placeholder="010-0000-0000"
            {...register('phoneNum')}
          />
          {errors.phoneNum && <Styled.InputError>{errors.phoneNum.message}</Styled.InputError>}
          <Input
            type="text"
            label="????????????"
            placeholder="??????????????? ??????????????????."
            {...register('description')}
            height={5}
          />
          {errors.description && (
            <Styled.InputError>{errors.description.message}</Styled.InputError>
          )}
        </div>
        <Styled.ButtonWrapper>
          <Button type="submit" color="yellow" radius={5} height={2.5}>
            ??? ?????? ??????
          </Button>
          <Button type="button" color="white" radius={5} height={2.5} onClick={movePreviousPage}>
            ??????
          </Button>
        </Styled.ButtonWrapper>
      </form>
    </div>
  );
}

export const getStaticProps: GetStaticProps = () => ({
  props: {}
});
