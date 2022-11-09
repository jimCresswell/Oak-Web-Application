import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";

import { OakLinkPropsWithoutChildren, transformOakLinkProps } from "../OakLink";

import ButtonInner from "./ButtonInner";
import useButtonAsLinkProps from "./useButtonAsLinkProps";
import buttonStyles, {
  ButtonStylesProps,
  getButtonStylesProps,
} from "./button.styles";
import { CommonButtonProps, defaultButtonProps } from "./common";

const StyledNextLink = styled(Link)<ButtonStylesProps>`
  ${buttonStyles}
  ${({ disabled }) =>
    disabled === true &&
    `
   pointer-events: none;
  `}
`;
export type ButtonAsLinkProps = CommonButtonProps &
  OakLinkPropsWithoutChildren & {
    disabled?: boolean;
  };
const ButtonAsLink: FC<ButtonAsLinkProps> = (props) => {
  const transformedProps = transformOakLinkProps(props);
  const {
    href,
    label,
    labelSuffixA11y,
    shouldHideLabel,
    icon,
    "aria-label": ariaLabel,
    iconBackground,
    disabled = false,
    ...linkProps
  } = transformedProps;

  const { size, variant, $iconPosition, background } =
    getButtonStylesProps(transformedProps);

  const defaultTitle =
    ariaLabel || labelSuffixA11y ? `${label} ${labelSuffixA11y}` : "";

  return (
    <StyledNextLink
      {...linkProps}
      onClick={disabled ? (e) => e.preventDefault() : linkProps.onClick}
      {...useButtonAsLinkProps()}
      title={linkProps.title || defaultTitle}
      aria-label={ariaLabel}
      size={size}
      variant={variant}
      background={background}
      $iconPosition={$iconPosition}
      disabled={disabled}
      // see: https://www.scottohara.me/blog/2021/05/28/disabled-links.html
      aria-disabled={disabled}
      href={disabled ? "" : href}
    >
      <ButtonInner
        label={label}
        labelSuffixA11y={labelSuffixA11y}
        shouldHideLabel={shouldHideLabel}
        icon={icon}
        $iconPosition={$iconPosition}
        iconBackground={iconBackground}
        size={size}
        background={background}
        variant={variant}
        disabled={disabled}
      />
    </StyledNextLink>
  );
};

ButtonAsLink.defaultProps = defaultButtonProps;

export default ButtonAsLink;
