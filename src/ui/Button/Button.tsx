import { HTMLAttributes } from "react";
import styled from "styled-components"

const ButtonComponent = ({children, ...props}: HTMLAttributes<HTMLButtonElement>) => {
    return (
        <StyledButton {...props}>
            {children}
        </StyledButton>
    )
}

const StyledButton = styled.button`
padding: 10px 20px;
background-color: #3498db;
border: none;
border-radius: 5px;
color: white;
cursor: pointer;
transition: transform 0.3s;

&:hover {
    transform: scale(1.1);
}
`;

export default ButtonComponent;