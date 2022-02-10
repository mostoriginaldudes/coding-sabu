import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { flexCenter } from 'styles/module';
import { colors, media } from 'styles/theme';
import UnderlineTitle from 'styles/UnderlineTitle';

export const displayWidth = 1000 as const;
export const displaySpace = 20 as const;

export const cardBorder = css`
  border: 3px solid ${colors.black};
  border-radius: 5px;
  padding: 2em;
`;

export const Title = styled(UnderlineTitle)`
  ${media.tablet`
    display:none;
  `}
`;

export const CarouselContainer = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;

  ${media.tablet`
    display: none;
  `};
`;

export const Carousel = styled.ol`
  width: fit-content;
  height: 100%;
  display: flex;
  transform: translateX(0px);
  transition: transform 250ms ease-in-out;
`;

export const carouselArrowStyle = css`
  font-size: 5rem;
  color: ${colors.gray[5]};
  position: absolute;
  top: calc(250px - 2.5rem);
  opacity: 0.7;
  cursor: pointer;
  z-index: 10;
`;

export const ArrowLeft = styled(HiChevronLeft)`
  ${carouselArrowStyle}
  left: -1rem;
`;

export const ArrowRight = styled(HiChevronRight)`
  ${carouselArrowStyle}
  right: -1rem;
`;

export const Content = styled.li`
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

export const Thumbnail = styled.div<Prop>`
  width: 50%;
  height: 100%;
  background-color: ${colors.black};
  background-image: url(${({ imgUrl }) => imgUrl});
  background-size: auto;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Info = styled.div`
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
