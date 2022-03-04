import styled from '@emotion/styled';
import { flexCenter, positionFixed } from 'styles/module';

export const size = 160;
const delay = 3000;

export const HeadUpDpWrapper = styled.div`
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
