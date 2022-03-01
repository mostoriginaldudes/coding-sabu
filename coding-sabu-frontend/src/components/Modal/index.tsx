import { FC, memo, ReactNode, useEffect, useRef } from 'react';
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
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.65);
  z-index: ${modalMaskZIndex};
  ${media.tablet`
    display: none;
  `}
`;

const ModalContainer = styled.div`
  ${positionFixed}
  min-width: ${sizes.desktop / 4}px;
  max-width: ${sizes.desktop / 2}px;
  max-height: 100%;
  background-color: ${colors.white};
  border-radius: 5px;
  z-index: ${modalMaskZIndex + 7};
  box-shadow: 1px 12px 15px -4px rgba(0, 0, 0, 0.62);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow-y: auto;
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
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 1px solid ${colors.black};
  ${media.tablet`
    padding: 0 20px;
    margin-top: 65px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
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
    margin-bottom: 20px;
  `};
`;

interface Props {
  modalTitle: string;
  visibleModal: boolean;
  closeModal: () => void;
  children: ReactNode;
}

const Modal: FC<Props> = ({
  modalTitle,
  visibleModal,
  closeModal,
  children
}) => {
  const modalTarget = useRef<HTMLDivElement>(document.createElement('div'));

  useEffect(() => {
    const modalRoot = getModalRoot();
    modalRoot.appendChild(modalTarget.current);
    return () => {
      modalRoot && document.body.removeChild(modalRoot);
    };
  }, []);

  return createPortal(
    <>
      {visibleModal && (
        <>
          <ModalMask />
          <ModalContainer>
            <ModalHeader>
              <ModalTitle>{modalTitle}</ModalTitle>
              <ModalClose onClick={closeModal}>
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

export default memo(Modal);
