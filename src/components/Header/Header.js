import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const StyledHeader = styled.div`
  margin-bottom: 10px;
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
`;

const StyledHeaderImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  margin-right: 10px;
  object-fit: cover;
`;

const StyledHeaderHeading = styled.h4`
  color: #8f9093;
  margin: 0;
  ${({ color }) => {
    if (color) {
      return css`
        color: ${color};
      `;
    }
  }};
`;

const StyledHeaderLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const PlaceholderImg = styled(FaUserCircle)`
  height: 40px;
  width: 40px;
  margin-right: 10px;
  color: #8f9093;
  ${({ color }) => {
    if (color) {
      return css`
        color: ${color};
      `;
    }
  }};
`;

const Count = styled.div`
  color: #242526;
  background: orange;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  margin-right: 10px;
`;

export function Header({
  imgUrl,
  username,
  count,
  className,
  linkProps,
  imgProps,
  headingProps,
  ...headerProps
}) {
  return (
    <StyledHeader className={className} {...headerProps}>
      <StyledHeaderLink {...linkProps}>
        {imgUrl ? <StyledHeaderImage src={imgUrl} /> : <PlaceholderImg {...imgProps} />}
        <StyledHeaderHeading {...headingProps}>{username}</StyledHeaderHeading>
        {count && <Count>{count}</Count>}
      </StyledHeaderLink>
    </StyledHeader>
  );
}
