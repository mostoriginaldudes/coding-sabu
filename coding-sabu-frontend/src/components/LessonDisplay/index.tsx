import { FC, useState, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Lesson } from 'types';
import { concatHostToImagePath } from 'utils';
import UnderlineTitle from 'styles/UnderlineTitle';
import * as Styled from './LessonDisplay.style';
import Viewer from 'components/Viewer';

interface Props {
  lessons: Lesson[];
}

const LessonDisplay: FC<Props> = ({ lessons }) => {
  const carouselRef = useRef<HTMLOListElement | null>(null);
  const [movedPixels, setMovedPixels] = useState<number>(0);
  const [lessonIndex, setLessonIndex] = useState<number>(0);

  const moveCarouselToLeft = () => {
    if (carouselRef.current && lessonIndex > 0) {
      setMovedPixels(movedPixels + (Styled.displayWidth + Styled.displaySpace));
      carouselRef.current.style.transform = `translateX(${movedPixels}px)`;
      setLessonIndex(lessonIndex => lessonIndex - 1);
    }
  };

  const moveCarouselToRight = () => {
    if (carouselRef.current && lessonIndex < lessons.length - 1) {
      setMovedPixels(movedPixels - (Styled.displayWidth + Styled.displaySpace));
      carouselRef.current.style.transform = `translateX(${movedPixels}px)`;
      setLessonIndex(lessonIndex => lessonIndex + 1);
    }
  };

  const leftArrowCursorStyle = useMemo(
    () => (lessonIndex === 0 ? 'not-allowed' : 'pointer'),
    [lessonIndex]
  );

  const rightArrowCursorStyle = useMemo(
    () => (lessonIndex === lessons.length! - 1 ? 'not-allowed' : 'pointer'),
    [lessonIndex, lessons]
  );

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${movedPixels}px)`;
    }
  }, [movedPixels]);

  return (
    <Styled.LessonDisplay>
      <UnderlineTitle title="추천하는 수련" />
      <Styled.CarouselContainer>
        <Styled.ArrowLeft
          onClick={moveCarouselToLeft}
          cursor={leftArrowCursorStyle}
        />
        <Styled.Carousel ref={carouselRef}>
          {lessons.map(
            ({ id, title, description, teacherName, thumbnailUrl }: Lesson) => (
              <Styled.Content key={id}>
                <Styled.Thumbnail
                  imgUrl={concatHostToImagePath(thumbnailUrl)}
                />
                <Styled.Info>
                  <div>
                    <h3>{title}</h3>
                    <h4>{teacherName}</h4>
                  </div>
                  <article>
                    <div>
                      <Viewer description={description} />
                    </div>
                    <button>
                      <Link to={`/lesson/${id}`}>자세히 보기</Link>
                    </button>
                  </article>
                </Styled.Info>
              </Styled.Content>
            )
          )}
        </Styled.Carousel>
        <Styled.ArrowRight
          onClick={moveCarouselToRight}
          cursor={rightArrowCursorStyle}
        />
      </Styled.CarouselContainer>
    </Styled.LessonDisplay>
  );
};

export default LessonDisplay;
