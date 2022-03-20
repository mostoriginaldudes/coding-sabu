import { FC } from 'react';
import * as Styled from 'styles/TextBox';
interface Props {
  legend: string;
  children: string | number;
}

const TextBox: FC<Props> = ({ legend, children }) => {
  return (
    <Styled.Container>
      <Styled.Legend>{legend}</Styled.Legend>
      <h3>{children}</h3>
    </Styled.Container>
  );
};

export default TextBox;
