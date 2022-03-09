import { useState, useEffect, useCallback, useMemo, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from 'store';
import { editUser } from 'store/auth';
import { EditUserInfo } from 'types';
import validationSchema from 'utils/FormValidation/auth/ValidationSchema';
import * as Styled from 'styles/MyPage';
import Input from 'components/Input';
import Button from 'components/Button';
import Head from 'next/head';
import { showHud } from 'store/ui';
import AUTH_FAIL from 'fixtures/auth/fail';

export default function MyPage() {
  const router = useRouter();
  const { data, error } = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const [imgUrl, setImgUrl] = useState<string | undefined>(data?.profileImage);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const hasBeenUploaded = useMemo(() => data?.profileImage !== '', [data]);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors }
  } = useForm<EditUserInfo>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema.getEditUser()),
    defaultValues: {
      id: data?.id,
      email: data?.email,
      nickname: data?.nickname,
      phoneNum: data?.phoneNum,
      description: data?.description
    }
  });

  const onSubmit: SubmitHandler<EditUserInfo> = async (newInfo, event) => {
    event?.preventDefault();

    if (data) {
      const formData = new FormData();
      formData.append('id', String(data.id));
      formData.append('email', data.email);
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
    if (!data) {
      dispatch(showHud(AUTH_FAIL.REQUIRED_LOGIN));
      movePreviousPage();
    }
  }, [data]);

  const movePreviousPage = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    checkIfLoggedIn();
  }, [data]);

  useEffect(() => {
    return () => {
      clearErrors();
      imgUrl && URL.revokeObjectURL(imgUrl);
    };
  }, [clearErrors, imgUrl]);

  return (
    <div>
      <Head>
        <title>내 정보 | 코딩사부</title>
      </Head>
      <form onSubmit={handleSubmit(onSubmit)} noValidate encType="multipart/form-data">
        <Styled.Row>
          <Styled.ProfileContainer imgUrl={imgUrl}>
            {hasBeenUploaded && <label htmlFor="profileImage">프로필 사진 업로드</label>}
            <Styled.ProfileInput
              type="file"
              id="profileImage"
              placeholder="프로필 사진"
              accept="image/*"
              onChange={uploadProfile}
            />
          </Styled.ProfileContainer>
          <Styled.InputContainer>
            <Input
              type="email"
              label="이메일"
              placeholder="example@email.com"
              onChange={() => {}}
              value={data?.email}
              readOnly
              disabled
            />
            {errors.email && <Styled.InputError>{errors.email.message}</Styled.InputError>}
            <Input
              label="새 비밀번호 (변경하고 싶지 않다면 기존 비밀번호)"
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
          </Styled.InputContainer>
        </Styled.Row>
        <div>
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
        </div>
        <Styled.ButtonWrapper>
          <Button type="submit" color="yellow" radius={5} height={2.5}>
            내 정보 변경
          </Button>
          <Button type="button" color="white" radius={5} height={2.5} onClick={movePreviousPage}>
            취소
          </Button>
        </Styled.ButtonWrapper>
      </form>
    </div>
  );
}
