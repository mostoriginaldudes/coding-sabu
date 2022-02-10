import { FC, ReactNode } from 'react';
import styled from '@emotion/styled';
import { colors } from 'styles/theme';

const TextBoxContainer = styled.fieldset`
  margin-bottom: 1em;
`;

const TextBoxLegend = styled.legend`
  background-color: ${colors.yellow[4]};
  padding: 0.2em 0.3em;
  border-radius: 2px;
  border: 1px solid ${colors.black};
`;

interface Props {
  legend: string;
  children: ReactNode;
}

const TextBox: FC<Props> = ({ legend, children }) => {
  return (
    <TextBoxContainer>
      <TextBoxLegend>{legend}</TextBoxLegend>
      <h3>{children}</h3>
    </TextBoxContainer>
  );
};

export default TextBox;
