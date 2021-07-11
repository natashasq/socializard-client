import styled, { css } from "styled-components";

const StyledButton = styled.button`
  margin-left: 15px;
  border-radius: 5px;
  outline: none;
  border-color: transparent;
  background-color: #3a3b3c;
  min-height: 25px;
  padding: 0 10px;
  color: #8f9093;
  font-weight: bold;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.75);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  white-space: nowrap;
  padding: 5px;

  ${({ color }) => {
    if (color) {
      return css`
        color: ${color};
      `;
    }
  }};

  ${({ backgroundColor }) => {
    if (backgroundColor) {
      return css`
        background-color: ${backgroundColor};
      `;
    }
  }}

  ${({ marginLeft }) => {
    if (marginLeft) {
      return css`
        margin-left: ${marginLeft};
      `;
    }
  }};

${({ margin }) => {
    if (margin) {
      return css`
        margin: ${margin};
      `;
    }
  }};
`;

export function Button({ onClick, children, ...buttonProps }) {
  return (
    <StyledButton onClick={onClick} {...buttonProps}>
      {children}
    </StyledButton>
  );
}
