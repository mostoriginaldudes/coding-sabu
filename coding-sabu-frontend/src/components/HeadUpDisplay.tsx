import Image from 'next/image';
import { FC, useCallback, useMemo, memo } from 'react';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { hideHud } from 'store/ui';
import COMMON from 'fixtures/common/success';
import useTimeout from 'hooks/useTimeout';
import { hideHud } from 'store/ui';
import { HeadUpDpWrapper, size, delay } from 'styles/HeadUpDisplay';

const HeadUpDisplay: FC = () => {
  const { visibleHud, hudStatusText } = useSelector((state: RootState) => ({
    visibleHud: state.ui.visibleHud as boolean,
    hudStatusText: state.ui.hudStatusText as string
  }));
  const dispatch = useDispatch();

  const hideHeadUp = useCallback(() => {
    visibleHud && dispatch(hideHud());
  }, [visibleHud, dispatch]);

  const hudIcon = useMemo(
    () => (hudStatusText.includes(COMMON.SUCCESS) ? '/images/success.svg' : '/images/fail.svg'),
    [hudStatusText]
  );

  useTimeout(hideHeadUp, delay, [visibleHud]);

  if (typeof window !== 'undefined' && document) {
    return createPortal(
      <>
        {visibleHud && (
          <HeadUpDpWrapper>
            <Image
              src={hudIcon}
              alt={hudStatusText}
              width={size / 2}
              height={size / 2}
              layout="fixed"
            />
            <h4 data-testid="text">{hudStatusText}</h4>
          </HeadUpDpWrapper>
        )}
      </>,
      document.getElementById('modal')!
    );
  }
  return null;
};

export default memo(HeadUpDisplay);
