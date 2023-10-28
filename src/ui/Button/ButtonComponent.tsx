import { ButtonHTMLAttributes } from "react";
import styled from "styled-components"

const ButtonComponent = ({ children, ...props }
    : React.DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    return (
        <StyledButton {...props}>
            {children}
        </StyledButton>
    )
}

const StyledButton = styled.button`
padding: 10px 20px;
background-color: var(--basic-green);
border: none;
border-radius: 5px;
color: white;
cursor: pointer;
transition: transform 0.3s;

&:hover {
    transform: scale(1.01);
    background-color: var(--dark-green);
}
`;

export default ButtonComponent;