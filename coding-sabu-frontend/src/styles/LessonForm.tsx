import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { flexCenter, FlexCol } from 'styles/modules/common';
import { colors, media } from 'styles/modules/theme';

const form = css`
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

interface LessonThumbnail {
  imgUrl?: string;
}

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

const InputError = styled.p`
  font-size: 0.7rem;
  font-weight: bold;
  color: ${colors.red[7]};
  width: 100%;
  margin-top: 0;
`;

export { Row } from 'styles/modules/common';
export { form, InputContainer, ThumbnailContainer, ThumbnailInput, InputError };
