import styled, { css } from "styled-components";

const StyledInput = styled.input`
  border-radius: 20px;
  outline: none;
  border-color: transparent;
  background-color: #3a3b3c;
  color: white;
  padding: 0 10px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.75);
  max-height: 40px;
  flex-basis: 100%;
  height: 40px;

  ${({ margin }) => {
    if (margin) {
      return css`
        margin: ${margin};
      `;
    }
  }};

  ${({ width }) => {
    if (width) {
      return css`
        width: ${width};
      `;
    }
  }};

  ${({ backgroundColor }) => {
    if (backgroundColor) {
      return css`
        background-color: ${backgroundColor};
      `;
    }
  }};

${({ padding }) => {
    if (padding) {
      return css`
        padding: ${padding};
      `;
    }
  }};
`;

export function Input({ ...props }) {
  return <StyledInput {...props} />;
}
