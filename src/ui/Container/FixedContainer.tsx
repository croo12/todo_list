import { styled } from "styled-components";

export const FixedContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

    background-color: #ffffff;
    z-index: 1001;
`;