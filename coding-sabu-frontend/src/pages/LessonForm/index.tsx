import {
  FC,
  Reducer,
  useCallback,
  useReducer,
  useState,
  ChangeEvent,
  SyntheticEvent,
  useMemo
} from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import UnderlineTitle from 'styles/UnderlineTitle';
import Input from 'components/Input';
import Editor from 'components/Editor';
import Button from 'components/Button';
import { FlexCol, flexCenter } from 'styles/module';
import { colors } from 'styles/theme';
import { LessonFormAction as Action } from 'types';

const Form = styled.form`
  ${flexCenter}
  flex-direction: column;
`;

const Row = styled.div`
  ${flexCenter}
  justify-content: space-between;
  width: 100%;
  margin: 1em 0;
  & > div {
    width: 100%;
  }
  & > button {
    width: 45%;
  }
`;

const InputContainer = styled(FlexCol)`
  width: 45%;
  height: 100%;
  margin-right: 5%;
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
  const history = useHistory();
  const [imgUrl, setImageUrl] = useState<string>('');
  const hasBeenUploaded = useMemo(() => imgUrl === '', [imgUrl]);

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

  const uploadThumbnail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files![0];
      const lessonImageUrl = URL.createObjectURL(file);
      setImageUrl(lessonImageUrl);
    },
    [setImageUrl]
  );

  const backToPreviousPage = useCallback(() => {
    history.goBack();
  }, [history]);

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
            {hasBeenUploaded && (
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
            onClick={backToPreviousPage}
          >
            취소
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default LessonForm;
