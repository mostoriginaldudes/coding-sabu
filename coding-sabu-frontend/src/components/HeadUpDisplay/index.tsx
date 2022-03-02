import React, { useEffect, useCallback, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { RootState } from 'store';
import { createActionInvisibleHud } from 'store/ui';
import { getModalRoot } from 'utils';
import { flexCenter, positionFixed } from 'styles/module';
import success from 'assets/images/success.svg';
import fail from 'assets/images/fail.svg';
import COMMON from 'fixtures/common/success';

const size = 160;
const delay = 3000;
const HeadUpDpWrapper = styled.div`
  ${flexCenter}
  ${positionFixed}
  z-index: 50;
  flex-direction: column;
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

  & > h4 {
    text-align: center;
    font-size: 0.8rem;
  }
`;

const HeadUpDisplay: React.FC = () => {
  const modalTarget = useRef<HTMLDivElement>(document.createElement('div'));
  const { visibleHud, hudStatusText } = useSelector((state: RootState) => ({
    visibleHud: state.ui.visibleHud,
    hudStatusText: state.ui.hudStatusText
  }));
  const dispatch = useDispatch();

  const hideHeadUp = useCallback(() => {
    visibleHud && dispatch(createActionInvisibleHud());
  }, [visibleHud, dispatch]);

  const hudIcon = useMemo(
    () => (hudStatusText.includes(COMMON.SUCCESS) ? success : fail),
    [hudStatusText]
  );

  useEffect(() => {
    const modalRoot = getModalRoot();
    const current = modalTarget.current;
    modalRoot.appendChild(current);

    const timerId = setTimeout(hideHeadUp, delay);

    return () => {
      modalRoot.removeChild(current);
      clearTimeout(timerId);
    };
  }, [hideHeadUp]);

  return createPortal(
    <>
      {visibleHud && (
        <HeadUpDpWrapper>
          <img src={hudIcon} alt={hudStatusText} width={size / 2} />
          <h4 data-testid="text">{hudStatusText}</h4>
        </HeadUpDpWrapper>
      )}
    </>,
    modalTarget.current
  );
};

export default React.memo(HeadUpDisplay);
