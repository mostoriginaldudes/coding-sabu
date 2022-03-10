import { FC, memo, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { getModalRoot } from 'utils';
import { HiX } from 'react-icons/hi';
import * as Styled from 'styles/Modal';

interface Props {
  modalTitle: string;
  visibleModal: boolean;
  closeModal: () => void;
  children: ReactNode;
}

const Modal: FC<Props> = ({ modalTitle, visibleModal, closeModal, children }) => {
  if (typeof window !== 'undefined') {
    return createPortal(
      <>
        {visibleModal && (
          <>
            <Styled.Mask />
            <Styled.Container>
              <Styled.Header>
                <Styled.Title>{modalTitle}</Styled.Title>
                <Styled.Close onClick={closeModal}>
                  <HiX fontSize="2em" />
                </Styled.Close>
              </Styled.Header>
              <Styled.Body>{children}</Styled.Body>
            </Styled.Container>
          </>
        )}
      </>,
      document.getElementById('modal')!
    );
  }
  return null;
};

export default memo(Modal);