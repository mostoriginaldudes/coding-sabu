import { FC, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lesson } from 'types';
import { concatHostToImagePath } from 'utils';
import UnderlineTitle from 'styles/UnderlineTitle';
import * as Styled from './LessonDisplay.style';
interface Props {
  lessons: Lesson[];
}

const LessonDisplay: FC<Props> = ({ lessons }) => {
  const carouselRef = useRef<HTMLOListElement | null>(null);
  const [movedPixels, setMovedPixels] = useState<number>(0);
  const [lessonIndex, setLessonIndex] = useState<number>(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${movedPixels}px)`;
    }
  }, [movedPixels]);

  const moveCarouselToLeft = () => {
    if (carouselRef.current && lessonIndex - 1 > 0) {
      setMovedPixels(movedPixels + (Styled.displayWidth + Styled.displaySpace));
      carouselRef.current.style.transform = `translateX(${movedPixels}px)`;
      setLessonIndex(lessonIndex - 1);
    }
  };

  const moveCarouselToRight = () => {
    if (carouselRef.current && lessonIndex + 1 < lessons.length - 1) {
      setMovedPixels(movedPixels - (Styled.displayWidth + Styled.displaySpace));
      carouselRef.current.style.transform = `translateX(${movedPixels}px)`;
      setLessonIndex(lessonIndex + 1);
    }
  };

  return (
    <Styled.LessonDisplay>
      <UnderlineTitle title="추천하는 수련" />
      <Styled.CarouselContainer>
        <Styled.ArrowLeft
          onClick={moveCarouselToLeft}
          style={{
            cursor: `${lessonIndex === 0 ? 'not-allowed' : 'pointer'}`
          }}
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
                    <p>{description}</p>
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
          style={{
            cursor: `${
              lessonIndex === lessons.length - 1 ? 'not-allowed' : 'pointer'
            }`
          }}
        />
      </Styled.CarouselContainer>
    </Styled.LessonDisplay>
  );
};

export default LessonDisplay;
