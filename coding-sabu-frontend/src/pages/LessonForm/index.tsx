import {
  FC,
  Reducer,
  useCallback,
  useReducer,
  useState,
  ChangeEvent,
  SyntheticEvent,
  useMemo,
  useEffect
} from 'react';
import styled from '@emotion/styled';
import Input from 'components/Input';
import Editor from 'components/Editor';
import Button from 'components/Button';
import UnderlineTitle from 'styles/UnderlineTitle';
import Row from 'styles/Row';
import { FlexCol, flexCenter } from 'styles/module';
import { colors, media } from 'styles/theme';
import { LessonFormAction as Action } from 'types';
import useRouting from 'hooks/useRouting';

const Form = styled.form`
  ${flexCenter}
  flex-direction: column;
`;

const InputContainer = styled(FlexCol)`
  width: 45%;
  height: 100%;
  margin-right: 5%;
  ${media.tablet`
    margin-right: 0;
  `}
`;

const ThumbnailContainer = styled.div<LessonThumbnail>`
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
`;

const ThumbnailInput = styled.input`
  border: none;
  position: absolute;
  opacity: 0;
  z-index: -1;
  &:focus {
    border: none;
  }
`;

interface LessonThumbnail {
  imgUrl?: string;
}

interface State {
  title: string;
  price: string;
  description: string;
  terminatedAt: Date;
}

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.name) {
    case 'title':
      return { ...state, title: action.value };
    case 'price':
      return { ...state, price: action.value };
    case 'description':
      return { ...state, description: action.value };
    case 'terminatedAt':
      return { ...state, terminatedAt: new Date(action.value) };
    default:
      return state;
  }
};

const LessonForm: FC = () => {
  const [imgUrl, setImgUrl] = useState<string>('');
  const hasBeenUploaded = useMemo(() => imgUrl !== '', [imgUrl]);
  const { back } = useRouting();

  const [state, dispatch] = useReducer(reducer, {
    title: '',
    price: '',
    description: '',
    terminatedAt: new Date()
  });

  const onSubmit = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
  }, []);

  const onChange = useCallback(
    ({ target }: { target: Action }) => dispatch(target as Action),
    [dispatch]
  );

  const convertDateTimeToString = useMemo(
    () => state.terminatedAt.toJSON().slice(0, -3),
    [state]
  );

  const uploadThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      const lessonImgUrl = URL.createObjectURL(file);
      setImgUrl(lessonImgUrl);
    }
  };

  useEffect(() => {
    return () => {
      imgUrl && URL.revokeObjectURL(imgUrl);
    };
  });

  return (
    <div>
      <UnderlineTitle title="수련 창설" />
      <Form onSubmit={onSubmit}>
        <Row>
          <InputContainer>
            <Input
              name="title"
              label="수련 이름"
              placeholder="수련 제목을 입력해주세요."
              value={state.title}
              onChange={onChange}
            />
            <Input
              name="price"
              label="수련 가치"
              placeholder="수련 가격을 입력해주세요."
              value={state.price}
              onChange={onChange}
            />
            <Input
              name="terminatedAt"
              type="datetime-local"
              label="종료일"
              value={convertDateTimeToString}
              onChange={onChange}
            />
          </InputContainer>
          <ThumbnailContainer imgUrl={imgUrl}>
            {hasBeenUploaded || (
              <label htmlFor="lessonFile">수련 소개 이미지 업로드</label>
            )}
            <ThumbnailInput
              type="file"
              id="lessonFile"
              placeholder="수련 소개 이미지"
              onChange={uploadThumbnail}
            />
          </ThumbnailContainer>
        </Row>
        <Row>
          <Editor setValue={dispatch} />
        </Row>
        <Row>
          <Button color="yellow" radius={5} height={3}>
            수련 창설
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
        </Row>
      </Form>
    </div>
  );
};

export default LessonForm;
