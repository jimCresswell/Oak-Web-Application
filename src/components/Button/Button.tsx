import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  MouseEventHandler,
} from "react";

import UnstyledButton from "../UnstyledButton";

import ButtonInner, { ButtonInnerProps } from "./ButtonInner";
import { DEFAULT_BUTTON_SIZE } from "./common";

export type ButtonProps = ButtonInnerProps & {
  onClick: MouseEventHandler<HTMLButtonElement>;
  "aria-label"?: string;
  htmlButtonProps?: Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    "ref"
  >;
};

const Button: FC<ButtonProps> = (props) => {
  const {
    onClick,
    size = DEFAULT_BUTTON_SIZE,
    label,
    icon,
    iconPosition = "leading",
    "aria-label": ariaLabel,
    htmlButtonProps = {},
  } = props;

  return (
    <UnstyledButton
      {...htmlButtonProps}
      title={htmlButtonProps.title || ariaLabel || label}
      aria-label={ariaLabel || label}
      onClick={onClick}
    >
      <ButtonInner
        label={label}
        icon={icon}
        iconPosition={iconPosition}
        size={size}
      />
    </UnstyledButton>
  );
};

export default Button;
