import { useMemo, FC, memo } from 'react';
import { Lesson } from 'types';
import * as Styled from 'styles/LessonItem';

const LessonItem: FC<Lesson> = ({ teacherName, title, price, thumbnailUrl, studentCount }) => {
  const formattedPrice = useMemo(() => {
    if (price === 0) {
      return 'FREE';
    } else {
      return `${price.toLocaleString()}원`;
    }
  }, [price]);

  return (
    <Styled.LessonContainer>
      <Styled.Thumbnail thumbnailUrl={thumbnailUrl} />
      <Styled.LessonInfo>
        <Styled.LessonHeader>
          <Styled.LessonTitle>{title}</Styled.LessonTitle>
          <Styled.TeacherName>{teacherName}</Styled.TeacherName>
        </Styled.LessonHeader>
        <Styled.LessonFooter>
          <Styled.EmpahsisBlock>{studentCount}명</Styled.EmpahsisBlock>
          <Styled.EmphasisText>{formattedPrice}</Styled.EmphasisText>
        </Styled.LessonFooter>
      </Styled.LessonInfo>
    </Styled.LessonContainer>
  );
};

export default memo(LessonItem);
