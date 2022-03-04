import { FC } from 'react';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import { colors } from './theme';

const overrideStyles = css`
  position: fixed;
  margin: 0 auto;
  left: calc(50vw - 50px);
  top: calc(50vh - 50px);
`;

interface Props {
  loading: boolean;
}

const Loader: FC<Props> = ({ loading }) => {
  return <ClipLoader size={100} color={colors.black} css={overrideStyles} loading={loading} />;
};

export default Loader;
