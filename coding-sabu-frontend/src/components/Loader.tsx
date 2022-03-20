import { FC } from 'react';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/react';
import { colors } from 'styles/modules/theme';

const overrideStyles = css`
  position: fixed;
  margin: 0 auto;
  left: calc(50vw - 50px);
  top: calc(50vh - 50px);
`;

interface Props {
  loading: boolean;
  size?: number;
}

const Loader: FC<Props> = ({ loading, size = 100 }) => {
  return (
    <div css={overrideStyles}>
      <ClipLoader size={size} color={colors.black} loading={loading} />
    </div>
  );
};

export default Loader;
