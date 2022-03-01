/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from 'components/Input';
import Editor from 'components/Editor';
import Button from 'components/Button';
import UnderlineTitle from 'styles/UnderlineTitle';
import useRouting from 'hooks/useRouting';
import { createLesson } from 'apis';
import { RootState } from 'store';
import * as Styled from './LessonForm.style';
import { createActionVisibleHud } from 'store/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from 'utils/formValidation/lesson/ValidationSchema';
import LESSON_SUCCESS from 'fixtures/lesson/success';
import LESSON_FAIL from 'fixtures/lesson/fail';

interface LessonFormProps {
  title: string;
  price: number;
}

const LessonForm: React.FC = () => {
  const [imgUrl, setImgUrl] = useState<string>('');
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');

  const teacherId = useSelector((state: RootState) => state.auth.user.data?.id);
  const dispatch = useDispatch();

  const { replace, back } = useRouting();

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
      dispatch(createActionVisibleHud(LESSON_SUCCESS.OPEN));
      replace(`/lesson/${id}`);
    },
    [dispatch, replace]
  );

  const createLessonFail = useCallback(() => {
    dispatch(createActionVisibleHud(LESSON_FAIL.OPEN));
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
      const newLesson = await createLesson(getFormData(lessonForm));
      createLessonSuccess(newLesson.id);
    } catch (error) {
      createLessonFail();
    }
  };

  const hasBeenUploaded = useMemo(() => imgUrl !== '', [imgUrl]);

  const uploadThumbnail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
    teacherId || back();
    return () => {
      imgUrl && URL.revokeObjectURL(imgUrl);
    };
  }, [teacherId, back, imgUrl]);

  return (
    <div>
      <UnderlineTitle title="수련 창설" />
      <form
        css={Styled.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        encType="multipart/form-data"
      >
        <Styled.Row>
          <Styled.InputContainer>
            <Input
              label="수련 이름"
              placeholder="수련 제목을 입력해주세요."
              {...register('title')}
            />
            {errors.title && (
              <Styled.InputError>{errors.title.message}</Styled.InputError>
            )}
            <Input
              type="number"
              label="수련 가치"
              placeholder="수련 가격을 입력해주세요."
              {...register('price')}
            />
            {errors.price && (
              <Styled.InputError>{errors.price.message}</Styled.InputError>
            )}
          </Styled.InputContainer>
          <Styled.ThumbnailContainer imgUrl={imgUrl}>
            {hasBeenUploaded || (
              <label htmlFor="lessonFile">수련 소개 이미지 업로드</label>
            )}
            <Styled.ThumbnailInput
              type="file"
              id="lessonFile"
              placeholder="수련 소개 이미지"
              onChange={uploadThumbnail}
            />
          </Styled.ThumbnailContainer>
        </Styled.Row>
        <Styled.Row>
          <Editor setValue={setDescription} />
        </Styled.Row>
        <Styled.Row>
          <Button type="submit" color="yellow" radius={5} height={3}>
            수련 개설
          </Button>
          <Button
            type="button"
            color="white"
            radius={5}
            height={3}
            onClick={back}
          >
            취소
          </Button>
        </Styled.Row>
      </form>
    </div>
  );
};

export default React.memo(LessonForm);
