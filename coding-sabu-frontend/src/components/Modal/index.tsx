import { FC, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { getModalRoot } from 'utils';
import { HiX } from 'react-icons/hi';
import styled from '@emotion/styled';
import { sizes, colors, media } from 'styles/theme';
import { flexCenter, positionFixed } from 'styles/module';

const modalMaskZIndex = 3;
const ModalMask = styled.div`
  ${positionFixed}
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.65);
  z-index: ${modalMaskZIndex};
  ${media.tablet`
    display: none;
  `}
`;

const ModalContainer = styled.div`
  ${positionFixed}
  min: {
    width: ${sizes.desktop / 4}px;
    width: ${sizes.desktop / 2}px;
  }
  background-color: ${colors.white};
  border-radius: 5px;
  z-index: ${modalMaskZIndex + 1};
  box-shadow: 1px 12px 15px -4px rgba(0, 0, 0, 0.62);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${media.tablet`
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    max-width: unset;
    box-shadow: unset;
  `}
`;

const ModalHeader = styled.header`
  ${flexCenter}
  justify-content: space-between;
  width: 100%;
  height: 3.5rem;
  background-color: ${colors.yellow[4]};
  padding: 0 10px;
  border: {
    top: {
      left-radius: 5px;
      right-radius: 5px;
    }
    bottom: 1px solid ${colors.black};
  }
  ${media.tablet`
    padding: 0 20px;
    border: {
      top: {
        left-radius: 0;
        right-radius: 0;
      }
    }
  `}
`;

const ModalTitle = styled.h3`
  color: ${colors.black};
  margin-left: 3px;
`;

const ModalClose = styled.button`
  ${flexCenter}
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const ModalBody = styled.article`
  width: ${sizes.desktop / 3}px;
  padding: 10px;
  background-color: ${colors.white};
  ${media.tablet`
    width: 100%;
    padding: 20px;
  `}
`;

interface Props {
  modalTitle: string;
}

const Modal: FC<Props> = ({ modalTitle, children }) => {
  const modalTarget = useRef<HTMLDivElement>(document.createElement('div'));
  const [visibleModal, setVisibleModal] = useState<boolean>(true);

  useEffect(() => {
    const modalRoot = getModalRoot();
    modalRoot.appendChild(modalTarget.current);
    return () => void document.body.removeChild(modalRoot);
  }, []);

  return createPortal(
    <>
      {visibleModal && (
        <>
          <ModalMask />
          <ModalContainer>
            <ModalHeader>
              <ModalTitle>{modalTitle}</ModalTitle>
              <ModalClose onClick={() => setVisibleModal(false)}>
                <HiX fontSize="2em" />
              </ModalClose>
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
          </ModalContainer>
        </>
      )}
    </>,
    modalTarget.current
  );
};

export default Modal;
