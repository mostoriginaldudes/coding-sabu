import styled from '@emotion/styled';
import { colors, sizes } from 'styles/theme';
import { flexCenter } from 'styles/module';

export const Container = styled.ul`
  width: 163px;
  box-shadow: rgb(0 0 0 / 25%) 0px 0px 15px;
  position: absolute;
  top: ${sizes.unitBig + 4}px;
  right: 0;
  background-color: ${colors.white};
`;

export const List = styled.li`
  ${flexCenter}
  width: 100%;
  height: 36px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.yellow[4]};
  }
  & > a {
    width: 100%;
    height: 100%;
    ${flexCenter}
  }
`;
