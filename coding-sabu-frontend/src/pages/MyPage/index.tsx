import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from 'components/Input';
import Button from 'components/Button';
import { EditUserInfo } from 'types';
import { RootState } from 'store';
import { createActionEditUser } from 'store/auth';

import FlexRow from 'styles/Row';
import styled from '@emotion/styled';
import { colors, media } from 'styles/theme';
import { flexCenter } from 'styles/module';

import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from 'utils/FormValidation/auth/ValidationSchema';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  ${media.tablet`
    width: 100%;
  `}
`;

const Row = styled(FlexRow)`
  & > div {
    width: 45%;
    ${media.tablet`
      width: 100%;
    `}
  }
`;

const ButtonWrapper = styled.div`
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

const ProfileContainer = styled.div<UserProfile>`
  width: 45%;
  height: 270px;
  background-color: ${colors.gray[1]};
  background-image: url(${({ imgUrl }) => imgUrl});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  & > label {
    ${flexCenter}
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  ${media.tablet`
    width: 100%;
  `}
`;

const ProfileInput = styled.input`
  border: none;
  position: absolute;
  opacity: 0;
  z-index: -1;
  &:focus {
    border: none;
  }
`;

const InputError = styled.p`
  font-size: 0.7rem;
  font-weight: bold;
  color: ${colors.red[7]};
  margin: 0;
`;

interface UserProfile {
  imgUrl?: string;
}

const MyPage: React.FC<RouteComponentProps> = ({ history }) => {
  const { user, token } = useSelector((state: RootState) => ({
    user: state.auth.user,
    token: state.auth.token
  }));
  const dispatch = useDispatch();

  const [imgUrl, setImgUrl] = useState<string | undefined>(
    user.data?.profileImage
  );
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const hasBeenUploaded = useMemo(() => user.data?.profileImage !== '', [user]);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors }
  } = useForm<EditUserInfo>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema.getEditUser()),
    defaultValues: {
      id: user.data?.id,
      email: user.data?.email,
      nickname: user.data?.nickname,
      phoneNum: user.data?.phoneNum,
      description: user.data?.description
    }
  });

  const onSubmit: SubmitHandler<EditUserInfo> = async (editUser, event) => {
    event?.preventDefault();

    if (user.data) {
      const formData = new FormData();
      formData.append('id', String(user.data.id));
      formData.append('email', user.data.email);
      formData.append('password', editUser.password);
      formData.append('nickname', editUser.nickname);
      formData.append('phoneNum', editUser.phoneNum);
      formData.append('description', editUser.description);
      formData.append('profileImage', profileImage as unknown as string);
      await dispatch(createActionEditUser(formData));

      if (user.error === null) {
        movePreviousPage();
      }
    }
  };

  const uploadProfile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files![0];
      if (file) {
        const profileImgUrl = URL.createObjectURL(file);
        setProfileImage(file);
        setImgUrl(profileImgUrl);
      }
    },
    [setImgUrl]
  );

  const movePreviousPage = useCallback(() => {
    history.goBack();
  }, [history]);

  useEffect(() => {
    return () => {
      clearErrors();
      imgUrl && URL.revokeObjectURL(imgUrl);
    };
  }, [clearErrors, imgUrl]);

  if (!token) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        encType="multipart/form-data"
      >
        <Row>
          <ProfileContainer imgUrl={imgUrl}>
            {hasBeenUploaded && (
              <label htmlFor="profileImage">프로필 사진 업로드</label>
            )}
            <ProfileInput
              type="file"
              id="profileImage"
              placeholder="프로필 사진"
              accept="image/*"
              onChange={uploadProfile}
            />
          </ProfileContainer>
          <InputContainer>
            <Input
              type="email"
              label="이메일"
              placeholder="example@email.com"
              onChange={() => {}}
              value={user.data?.email}
              readOnly
              disabled
            />
            {errors.email && <InputError>{errors.email.message}</InputError>}
            <Input
              label="새 비밀번호"
              type="password"
              placeholder="영문 대소문자, 숫자, 특수문자 포함(! @ # $)"
              {...register('password')}
            />
            {errors.password && (
              <InputError>{errors.password.message}</InputError>
            )}
            <Input
              type="password"
              label="새 비밀번호 확인"
              placeholder="비밀번호를 한번 더 입력해주세요."
              {...register('passwordCheck')}
            />
            {errors.passwordCheck && (
              <InputError>{errors.passwordCheck.message}</InputError>
            )}
          </InputContainer>
        </Row>
        <div>
          <Input
            type="text"
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
            {...register('nickname')}
          />
          {errors.nickname && (
            <InputError>{errors.nickname.message}</InputError>
          )}
          <Input
            type="text"
            label="전화번호"
            placeholder="010-0000-0000"
            {...register('phoneNum')}
          />
          {errors.phoneNum && (
            <InputError>{errors.phoneNum.message}</InputError>
          )}
          <Input
            type="text"
            label="자기소개"
            placeholder="자기소개를 입력해주세요."
            {...register('description')}
            height={5}
          />
          {errors.description && (
            <InputError>{errors.description.message}</InputError>
          )}
        </div>
        <ButtonWrapper>
          <Button type="submit" color="yellow" radius={5} height={2.5}>
            내 정보 변경
          </Button>
          <Button
            type="button"
            color="white"
            radius={5}
            height={2.5}
            onClick={movePreviousPage}
          >
            취소
          </Button>
        </ButtonWrapper>
      </form>
    </>
  );
};

export default React.memo(MyPage);
