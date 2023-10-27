import { ReactNode } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { expandFromRight } from "../keyframes";

interface Props {
    visible: boolean;
    children: ReactNode;
}

const RightSidebarComponent = ({ visible, children }: Props) => {

    if (visible) {
        return null;
    }

    return (
        createPortal(
            <StyledSidebar>
                {children}
            </StyledSidebar>
            , document.body, "left-sidebar")
    );
}

export default RightSidebarComponent;

const StyledSidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 80%;  // 화면의 80% 크기
  background-color: #f7f7f7;
  overflow-y: auto;
  border-left: 1px solid #ddd;
  animation: ${expandFromRight} 0.3s forwards;

  form {
    padding: 20px;  // form에 대한 기본 패딩
    // form에 대한 추가적인 스타일링이 필요하다면 여기에 추가하세요
  }
`;