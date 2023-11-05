import React, { TextareaHTMLAttributes } from 'react';
import { styled } from 'styled-components';

interface TextareaProps extends React.DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {

};

const TextareaComponent = (props: TextareaProps) => {

  const { title, required } = props;

  return (
    <Container>
      {title && <Title>{title}{required && <Star>*</Star>}</Title>}
      <StyledTextarea {...props} />
    </Container>
  );
}

export default TextareaComponent;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 10rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.5;
  color: black;
  background-color: #fff;
  resize: none;
  
  &:focus {
    border-color: var(--dark-blue);
    outline: none;
    box-shadow: 0 0 0 2px rgba(102, 175, 233, 0.5);
  }
`;

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