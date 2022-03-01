import { FC, useEffect, useRef } from 'react';
import { Viewer as ToastViewer } from '@toast-ui/react-editor';

interface Props {
  description: string;
}

const Viewer: FC<Props> = ({ description }) => {
  const toastViewerRef = useRef<ToastViewer>(null);

  useEffect(() => {
    const currentViewerRef = toastViewerRef.current;
    return () => void currentViewerRef?.getInstance().destroy();
  }, []);

  return <ToastViewer initialValue={description} />;
};

export default Viewer;
