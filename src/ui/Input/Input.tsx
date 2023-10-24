import { InputHTMLAttributes } from "react";
import styled from "styled-components"

type InputProps = React.DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {};

const Input = (props: InputProps) => {

    const {title, required} = props;

    return (
        <Container >
            {title && <Title>{title}{required && <Star>*</Star>}</Title>}
            <input {...props} />
        </Container>
    )
}

const Container = styled.label`
display: flex;
flex-direction: column;
gap: 10px;
`;

const Title = styled.div`
font-size: 1rem;
`

const Star = styled.span`
font-size: 1rem;
color: tomato;
`

export default Input;