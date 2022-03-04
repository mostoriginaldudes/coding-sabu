import { useEffect, useCallback, useMemo, useRef, FC, memo } from 'react';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { hideHud } from 'store/ui';
import { getModalRoot } from 'utils';
import success from 'assets/images/success.svg';
import fail from 'assets/images/fail.svg';
import COMMON from 'fixtures/common/success';
import { HeadUpDpWrapper, size } from './HeadUpDisplay.style';

const HeadUpDisplay: FC = () => {
  const modalTarget = useRef<HTMLDivElement>(document.createElement('div'));
  const { visibleHud, hudStatusText } = useSelector((state: RootState) => ({
    visibleHud: state.ui.visibleHud,
    hudStatusText: state.ui.hudStatusText
  }));
  const dispatch = useDispatch();

  const hideHeadUp = useCallback(() => {
    visibleHud && dispatch(hideHud());
  }, [visibleHud, dispatch]);

  const hudIcon = useMemo(
    () => (hudStatusText.includes(COMMON.SUCCESS) ? success : fail),
    [hudStatusText]
  );

  useEffect(() => {
    const modalRoot = getModalRoot();
    const current = modalTarget.current;
    modalRoot.appendChild(current);

    const timerId = setTimeout(hideHeadUp, 3000);

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

export default memo(HeadUpDisplay);
