import { keyframes } from "styled-components";

export const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const expandFromDown = keyframes`
  from {
    transform: scaleY(0);
    transform-origin: top;
  }
  to {
    transform: scaleY(1);
    transform-origin: top;
  }
`;

export const expandFromRight = keyframes`
from {
  transform: scaleX(0);
  transform-origin: right;
}
to {
  transform: scaleX(1);
  transform-origin: right;
}
`;

export const shirimpFromRight = keyframes`
from {
  transform: scaleX(1);
  transform-origin: right;
}
to {
  transform: scaleX(0);
  transform-origin: right;
}
`;