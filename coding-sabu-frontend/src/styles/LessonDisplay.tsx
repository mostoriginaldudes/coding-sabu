import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { flexCenter } from 'styles/modules/common';
import { colors, media } from 'styles/modules/theme';

export const displayWidth = 1000 as const;
export const displaySpace = 20 as const;

const LessonDisplay = styled.div`
  width: 100%;
  ${media.tablet`
    display: none;
  `};
`;

const cardBorder = css`
  border: 3px solid ${colors.black};
  border-radius: 5px;
  padding: 2em;
`;

const CarouselContainer = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const Carousel = styled.ol`
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
`;

interface ArrowStyle {
  cursor: 'not-allowed' | 'pointer';
}
const ArrowLeft = styled(HiChevronLeft)<ArrowStyle>`
  ${carouselArrowStyle}
  left: -1rem;
  z-index: 20;
  cursor: ${({ cursor }) => cursor};
`;

const ArrowRight = styled(HiChevronRight)<ArrowStyle>`
  ${carouselArrowStyle}
  right: -1rem;
  z-index: 20;
  cursor: ${({ cursor }) => cursor};
`;

const Content = styled.li`
  ${flexCenter}
  width: ${displayWidth}px;
  height: ${displayWidth / 2}px;
  margin: 0 10px 5rem;
  padding: 20px 30px;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.1em;
  & > div {
    width: ${displayWidth / 2}px;
    margin: 10px;
    border-radius: 5px;
  }
  & > button {
    background-color: ${colors.yellow[4]};
  }
`;

interface Prop {
  imgUrl?: string;
}

const Thumbnail = styled.div<Prop>`
  width: 50%;
  height: 100%;
  border: 3px solid ${colors.black};
  background-image: url(${({ imgUrl }) => imgUrl});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const Info = styled.div`
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

    & > h3,
    h4 {
      width: 240px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    & > h4 {
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

    & > div {
      display: -webkit-box;
      width: 100%;
      height: 220px;
      margin: 0;
      font-size: 0.8em;
      text-overflow: ellipsis;
      line-height: 1.5em;
      white-space: normal;
      -webkit-line-clamp: 10;
      -webkit-box-orient: vertical;
      overflow: scroll;
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

export {
  LessonDisplay,
  cardBorder,
  CarouselContainer,
  Carousel,
  ArrowLeft,
  ArrowRight,
  Content,
  Thumbnail,
  Info
};
