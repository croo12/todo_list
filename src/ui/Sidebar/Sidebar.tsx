import { ReactNode } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";
import { expandFromRight } from "../keyframes";
import useAnimation from "../../hooks/useAnimation";

interface Props {
	visible: boolean;
	children?: ReactNode;
}

const RightSidebarComponent = ({ visible, children }: Props) => {

	const [visibleCondition, transitionEndHandler] = useAnimation(visible);

	if (!visibleCondition) {
		return null;
	}

	return (
		createPortal(
			<StyledSidebar $trigger={visible} onTransitionEnd={transitionEndHandler}>
				{children}
			</StyledSidebar>
			, document.body, "right-sidebar")
	);
}

export default RightSidebarComponent;

const StyledSidebar = styled.div<{ $trigger: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 60%;
	height: 100vh;
  background-color: #f7f7f7;
  overflow-y: auto;
  border-left: 1px solid #ddd;

	
	${ props => props.$trigger ? 
		css`animation-name: ${expandFromRight};
		animation-duration: 0.1s;
		animation-fill-mode: forwards;
		animation-iteration-count: 1;`
		 :
		css`transform-origin: right;
		transition: scale 0.1s ease-in-out;`
	}

	scale: ${props => props.$trigger ? `1`: `0`} 1;
`;