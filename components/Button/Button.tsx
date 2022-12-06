import styled from "styled-components";

interface ButtonProps {
  align?: string;
}

const Button = styled.button<ButtonProps>`
  padding: 0.5rem;
  text-align: ${(props) => props.align};
`;

export default Button;
