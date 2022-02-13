import { FC, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lesson } from 'types';
import { concatHostToImagePath } from 'utils';
import {
  ArrowLeft,
  ArrowRight,
  Carousel,
  CarouselContainer,
  Content,
  displaySpace,
  displayWidth,
  Info,
  Thumbnail,
  Title
} from './LessonDisplay.style';

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
      setMovedPixels(movedPixels + (displayWidth + displaySpace));
      carouselRef.current.style.transform = `translateX(${movedPixels}px)`;
      setLessonIndex(lessonIndex - 1);
    }
  };

  const moveCarouselToRight = () => {
    if (carouselRef.current && lessonIndex + 1 < lessons.length - 1) {
      setMovedPixels(movedPixels - (displayWidth + displaySpace));
      carouselRef.current.style.transform = `translateX(${movedPixels}px)`;
      setLessonIndex(lessonIndex + 1);
    }
  };

  return (
    <>
      <Title title="추천하는 수련" />
      <CarouselContainer>
        <ArrowLeft
          onClick={moveCarouselToLeft}
          style={{
            cursor: `${lessonIndex === 0 ? 'not-allowed' : 'pointer'}`
          }}
        />
        <Carousel ref={carouselRef}>
          {lessons.map(
            ({ id, title, description, teacherName, thumbnailUrl }: Lesson) => (
              <Content key={id}>
                <Thumbnail imgUrl={concatHostToImagePath(thumbnailUrl)} />
                <Info>
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
                </Info>
              </Content>
            )
          )}
        </Carousel>
        <ArrowRight
          onClick={moveCarouselToRight}
          style={{
            cursor: `${
              lessonIndex === lessons.length - 1 ? 'not-allowed' : 'pointer'
            }`
          }}
        />
      </CarouselContainer>
    </>
  );
};

export default LessonDisplay;
