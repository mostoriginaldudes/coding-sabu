import { useEffect, useCallback, useRef, FC, memo } from 'react';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { RootState } from 'store';
import { createActionInvisibleHud, State as UIState } from 'store/ui';
import success from 'assets/images/success.svg';
import fail from 'assets/images/fail.svg';
import useTimeout from 'hooks/useTimeout';
import { getModalRoot } from 'utils';
import { flexCenter, positionFixed } from 'styles/module';

const size = 160;
const delay = 3000;
const HeadUpDpWrapper = styled.div`
  ${flexCenter}
  ${positionFixed}
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
`;

/**
 *  사용이 필요한 컴포넌트에서 아래 코드 호출
 *  dispatch(createActionVisibleHud())
 */
const HeadUpDisplay: FC = () => {
  const modalTarget = useRef<HTMLDivElement>(document.createElement('div'));
  const { visibleHud, hudStatusText } = useSelector<RootState, UIState>(
    state => ({
      visibleHud: state.ui.visibleHud,
      hudStatusText: state.ui.hudStatusText
    })
  );

  const dispatch = useDispatch();

  const hideHeadUp = useCallback(() => {
    if (visibleHud) {
      dispatch(createActionInvisibleHud());
    }
  }, [visibleHud, dispatch]);

  useTimeout(hideHeadUp, delay);

  useEffect(() => {
    const current = modalTarget.current;
    const modalRoot = getModalRoot();

    modalRoot.appendChild(current);

    return () => void document.body.removeChild(modalRoot);
  }, []);

  return createPortal(
    <>
      {visibleHud && (
        <HeadUpDpWrapper>
          <img
            src={hudStatusText === 'success' ? success : fail}
            alt={hudStatusText}
            width={size / 2}
          />
          <h4 data-testid="text">
            {hudStatusText === 'success' ? '완료' : '실패'}했습니다.
          </h4>
        </HeadUpDpWrapper>
      )}
    </>,
    modalTarget.current
  );
};

export default memo(HeadUpDisplay);
