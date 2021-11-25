import { useState, useEffect, useCallback, useRef, FC } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import success from '../../assets/images/success.svg';
import fail from '../../assets/images/fail.svg';
import useTimeout from '../../hooks/useTimeout';

const size = 160;
const delay = 3000;
const HeadUpDpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: calc((100vh - ${size}px) / 2);
  left: calc((100vw - ${size}px) / 2);
  width: ${size}px;
  height: ${size}px;
  border: 1px solid #dedede;
  border-radius: 10px;
  color: rgba(119, 112, 115, 0.7);
  background-color: #dedede;
  filter: drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.25));
  animation-name: fade;
  animation-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
  animation-duration: ${delay}ms;
  animation-iteration-count: 1;
  @keyframes fade {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const getModalRoot = () => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal');
  document.body.appendChild(modalRoot);
  return modalRoot;
};

interface Props {
  type: 'success' | 'fail';
}

const HeadUpDisplay: FC<Props> = ({ type }) => {
  const [visible, setVisible] = useState<boolean>(true);
  const hideHeadUp = useCallback(
    () => setVisible(!visible),
    [visible, setVisible]
  );
  useTimeout(hideHeadUp, delay);

  const modalTarget = useRef<HTMLDivElement>(document.createElement('div'));

  useEffect(() => {
    const current = modalTarget.current;
    const modalRoot = getModalRoot();

    modalRoot.appendChild(current);

    return () => {
      document.body.removeChild(modalRoot);
    };
  }, []);

  return createPortal(
    <>
      {visible && (
        <HeadUpDpWrapper>
          <img
            src={type === 'success' ? success : fail}
            alt={type}
            width={size / 2}
          />
          <h4 data-testid="text">
            {type === 'success' ? '완료' : '실패'}했습니다.
          </h4>
        </HeadUpDpWrapper>
      )}
    </>,
    modalTarget.current
  );
};

export default HeadUpDisplay;
