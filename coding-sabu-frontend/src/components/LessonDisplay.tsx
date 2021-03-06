import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FC, useState, useEffect, useMemo, useRef } from 'react';
import UnderlineTitle from 'components/UnderlineTitle';
import lesson from 'store/lesson';
import * as Styled from 'styles/LessonDisplay';
import { Lesson } from 'types';

const Viewer = dynamic(() => import('components/Viewer'), { ssr: false });

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

  const leftArrowCursorStyle = useMemo(() => {
    if (lesson && lesson.length > 0) {
      return lessonIndex === 0 ? 'not-allowed' : 'pointer';
    } else {
      return 'auto';
    }
  }, [lessonIndex]);

  const rightArrowCursorStyle = useMemo(() => {
    if (lesson && lesson.length > 0) {
      return lessonIndex === lessons.length! - 1 ? 'not-allowed' : 'pointer';
    } else {
      return 'auto';
    }
  }, [lessonIndex, lessons]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${movedPixels}px)`;
    }
  }, [movedPixels]);

  return (
    <Styled.LessonDisplay>
      <UnderlineTitle title="추천하는 수련" />
      <Styled.CarouselContainer>
        <Styled.ArrowLeft onClick={moveCarouselToLeft} cursor={leftArrowCursorStyle} />
        <Styled.Carousel ref={carouselRef}>
          {lessons.map(({ id, title, description, teacherName, thumbnailUrl }: Lesson) => (
            <Styled.Content key={id}>
              <Styled.Thumbnail imgUrl={thumbnailUrl} />
              <Styled.Info>
                <div>
                  <h3>{title}</h3>
                  <h4>{teacherName}</h4>
                </div>
                <article>
                  <div>
                    <Viewer description={description} />
                  </div>
                  <Link href={`/lesson/${id}`} passHref>
                    <a>
                      <button>자세히 보기</button>
                    </a>
                  </Link>
                </article>
              </Styled.Info>
            </Styled.Content>
          ))}
        </Styled.Carousel>
        <Styled.ArrowRight onClick={moveCarouselToRight} cursor={rightArrowCursorStyle} />
      </Styled.CarouselContainer>
    </Styled.LessonDisplay>
  );
};

export default LessonDisplay;
