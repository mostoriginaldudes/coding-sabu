import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useState, useEffect, useMemo, useCallback, ChangeEvent } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from 'components/Input';
import Button from 'components/Button';
import UnderlineTitle from 'components/UnderlineTitle';
import PageHead from 'components/PageHead';
import LESSON_SUCCESS from 'fixtures/lesson/success';
import LESSON_FAIL from 'fixtures/lesson/fail';
import useRedux from 'hooks/useRedux';
import { createLesson } from 'store/lesson';
import { showHud } from 'store/ui';
import * as Styled from 'styles/LessonForm';
import validationSchema from 'utils/FormValidation/lesson/ValidationSchema';

const Editor = dynamic(() => import('components/Editor'), { ssr: false });

interface LessonFormProps {
  title: string;
  price: number;
}

export default function LessonForm() {
  const router = useRouter();

  const [imgUrl, setImgUrl] = useState<string>('');
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');

  const { useAppDispatch, useAppSelector } = useRedux();
  const dispatch = useAppDispatch();
  const { teacherId } = useAppSelector(state => ({
    teacherId: state.auth.user.data?.id
  }));

  const {
    register,
    handleSubmit,
    clearErrors,
    setFocus,
    formState: { errors }
  } = useForm<LessonFormProps>({
    resolver: yupResolver(validationSchema.getLesson()),
    defaultValues: {
      price: 0
    }
  });

  const createLessonSuccess = useCallback(
    (id: number) => {
      dispatch(showHud(LESSON_SUCCESS.OPEN));
      router.replace(`/lesson/${id}`);
    },
    [dispatch, router]
  );

  const createLessonFail = useCallback(() => {
    dispatch(showHud(LESSON_FAIL.OPEN));
    setFocus('title');
  }, [dispatch, setFocus]);

  const getFormData = useCallback(
    (lessonForm: LessonFormProps) => {
      const formData = new FormData();
      formData.append('teacherId', String(teacherId));
      formData.append('title', lessonForm.title);
      formData.append('description', description);
      formData.append('price', String(lessonForm.price));
      formData.append('imageThumbnail', imgFile!);
      return formData;
    },
    [teacherId, description, imgFile]
  );

  const onSubmit: SubmitHandler<LessonFormProps> = async lessonForm => {
    try {
      const wrappedResult = await dispatch(createLesson(getFormData(lessonForm)));
      const unwrappedResult = unwrapResult(wrappedResult);
      createLessonSuccess(unwrappedResult.id);
    } catch (error) {
      createLessonFail();
    }
  };

  const hasBeenUploaded = useMemo(() => imgUrl !== '', [imgUrl]);

  const uploadThumbnail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files![0];
      if (file) {
        const lessonImgUrl = URL.createObjectURL(file);
        setImgUrl(lessonImgUrl);
        setImgFile(file);
      }
    },
    [setImgUrl]
  );

  useEffect(() => {
    setFocus('title');
    return () => {
      clearErrors();
    };
  }, [setFocus, clearErrors]);

  useEffect(() => {
    teacherId || router.back();
    return () => {
      imgUrl && URL.revokeObjectURL(imgUrl);
    };
  }, [teacherId, imgUrl]);

  return (
    <div>
      <PageHead title="?????? ??????" />
      <UnderlineTitle title="?????? ??????" />
      <form
        css={Styled.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        encType="multipart/form-data"
      >
        <Styled.Row>
          <Styled.InputContainer>
            <Input
              label="?????? ??????"
              placeholder="?????? ????????? ??????????????????."
              {...register('title')}
            />
            {errors.title && <Styled.InputError>{errors.title.message}</Styled.InputError>}
            <Input
              type="number"
              label="?????? ??????"
              placeholder="?????? ????????? ??????????????????."
              {...register('price')}
            />
            {errors.price && <Styled.InputError>{errors.price.message}</Styled.InputError>}
          </Styled.InputContainer>
          <Styled.ThumbnailContainer imgUrl={imgUrl}>
            {hasBeenUploaded || <label htmlFor="lessonFile">?????? ?????? ????????? ?????????</label>}
            <Styled.ThumbnailInput
              type="file"
              id="lessonFile"
              placeholder="?????? ?????? ?????????"
              onChange={uploadThumbnail}
            />
          </Styled.ThumbnailContainer>
        </Styled.Row>
        <Styled.Row>
          <Editor setValue={setDescription} />
        </Styled.Row>
        <Styled.Row>
          <Button type="submit" color="yellow" radius={5} height={3}>
            ?????? ??????
          </Button>
          <Button type="button" color="white" radius={5} height={3} onClick={() => router.back()}>
            ??????
          </Button>
        </Styled.Row>
      </form>
    </div>
  );
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {}
  };
};
