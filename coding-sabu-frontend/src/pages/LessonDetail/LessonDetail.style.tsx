import styled from '@emotion/styled';
import Button from 'components/Button';
import { flexCenter } from 'styles/module';
import { colors } from 'styles/theme';

interface LessonThumbnail {
  imgUrl?: string;
}

export const LessonDetailContainer = styled.div`
  position: relative;
`;

export const NavButton = styled(Button)`
  position: absolute;
  right: 0;
`;

export const ThumbnailContainer = styled.div<LessonThumbnail>`
  width: 45%;
  height: 270px;
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

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

export const InfoContainer = styled(Column)`
  margin-left: 15px;
`;

export const ViewerContainer = styled(Column)`
  min-height: 200px;
  border: 1px dashed ${colors.gray[6]};
  border-radius: 5px;
  padding: 5px 10px;
`;
