import { FC } from 'react';
import { Viewer as ToastViewer } from '@toast-ui/react-editor';

interface Props {
  description: string;
}

const Viewer: FC<Props> = ({ description }) => {
  return <ToastViewer initialValue={description} />;
};

export default Viewer;
