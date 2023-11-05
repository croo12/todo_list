import { InputHTMLAttributes } from "react";
import styled from "styled-components"

interface InputProps extends React.DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  
};

const InputComponent = (props: InputProps) => {

    const {title, required} = props;

    return (
        <Container>
            {title && <Title>{title}{required && <Star>*</Star>}</Title>}
            <StyledInput {...props} />
        </Container>
    )
}

const Container = styled.label`
display: flex;
flex-direction: column;
gap: 10px;
`;

const Title = styled.div`
text-align: left;
font-size: 1rem;
color: black;
`

const Star = styled.span`
font-size: 1rem;
color: tomato;
`

const StyledInput = styled.input`
  padding: 10px 15px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #007bff; 
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
  }

  &:disabled {
    background-color: #f1f1f1; 
    cursor: not-allowed;
`;

export default InputComponent;