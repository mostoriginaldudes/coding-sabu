import { FC } from 'react';
import styled from '@emotion/styled';

const UnderlineTitleStyle = styled.header`
  width: 100%;
  text-align: left;
  border-bottom: 1px solid #707070;
  padding-bottom: 20px;
  margin-bottom: 20px;
  font-size: 1.3rem;
  font-weight: bold;
`;

interface Props {
  title: string;
}

const UnderlineTitle: FC<Props> = ({ title }) => {
  return <UnderlineTitleStyle>{title}</UnderlineTitleStyle>;
};

export default UnderlineTitle;
