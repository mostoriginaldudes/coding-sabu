import { FC, useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors, media } from 'styles/theme';
import { Lesson } from 'types';
import { flexCenter } from 'styles/module';
import { Link } from 'react-router-dom';
import UnderlineTitle from 'styles/UnderlineTitle';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const displayWidth = 1000;
const displaySpace = 20;

const cardBorder = css`
  border: 3px solid ${colors.black};
  border-radius: 5px;
  padding: 2em;
`;

const Title = styled(UnderlineTitle)`
  ${media.tablet`
    display:none;
  `}
`;

const CarouselContainer = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;

  ${media.tablet`
  display: none;
  `};
`;
const Carousel = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  transform: translateX(0px);
  transition: transform 250ms ease-in-out;
`;

const carouselArrowStyle = css`
  font-size: 5rem;
  color: ${colors.gray[5]};
  position: absolute;
  top: calc(250px - 2.5rem);
  opacity: 0.7;
  cursor: pointer;
  z-index: 10;
`;

const ArrowLeft = styled(HiChevronLeft)`
  ${carouselArrowStyle}
  left: -1rem;
`;
const ArrowRight = styled(HiChevronRight)`
  ${carouselArrowStyle}
  right: -1rem;
`;

const Content = styled.ul`
  ${flexCenter}
  width: ${displayWidth}px;
  height: ${displayWidth / 2}px;
  margin: 0 10px 5rem;
  padding: 20px 30px;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.1em;
  & > li {
    width: ${displayWidth / 2}px;
    margin: 10px;
    border-radius: 5px;
  }
  & > button {
    background-color: ${colors.yellow[4]};
  }
`;

type ImagePath = { imagePath: string | undefined };
const Thumbnail = styled.li<ImagePath>`
  width: 50%;
  height: 100%;
  background-color: ${colors.black};
  background-image: url(${({ imagePath }) => imagePath});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const Info = styled.li`
  ${flexCenter}
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  height: 100%;

  & > div {
    ${flexCenter}
    ${cardBorder}
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;

    & > h2,
    h3 {
      width: 230px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    & > h3 {
      text-align: right;
    }
  }

  & > article {
    ${cardBorder}
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: 100%;

    & > p {
      display: -webkit-box;
      width: 100%;
      height: 194px;
      margin: 0;
      font-size: 0.8em;
      text-overflow: ellipsis;
      line-height: 1.5em;
      white-space: normal;
      -webkit-line-clamp: 10;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    & > button {
      background-color: ${colors.yellow[4]};
      border: none;
      padding: 0.7em;
      font-weight: bold;
      border-radius: 5px;
      border: 2px solid ${colors.black};
      cursor: pointer;
    }
  }
`;

interface Props {
  lessons: Lesson[];
}

const LessonDisplay: FC<Props> = ({ lessons }) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
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
            ({
              lessonId,
              lessonThumbnailPath,
              lessonTitle,
              teacher,
              lessonDescription
            }: Lesson) => (
              <Content key={lessonId}>
                <Thumbnail imagePath={lessonThumbnailPath} />
                <Info>
                  <div>
                    <h2>{lessonTitle}</h2>
                    <h3>{teacher}</h3>
                  </div>
                  <article>
                    <p>{lessonDescription}</p>
                    <button>
                      <Link to={`/lesson/${lessonId}`}>자세히 보기</Link>
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
