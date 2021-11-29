import { FC, useMemo, useState } from 'react';
import LoginForm from 'components/LoginForm';
import SignupForm from 'components/SignupForm';

type RenderedModal = 'login' | 'signup';

const UserAuthForm: FC = () => {
  const [renderedModal, setRenderedModal] = useState<RenderedModal>('login');

  const ModalToRender = useMemo(
    () => (renderedModal === 'login' ? LoginForm : SignupForm),
    [renderedModal]
  );

  return <ModalToRender setRenderedModal={setRenderedModal} />;
};

export default UserAuthForm;
