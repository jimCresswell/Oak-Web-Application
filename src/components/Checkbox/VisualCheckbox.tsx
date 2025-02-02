import { FC } from "react";
import styled from "styled-components";

import position, { PositionProps } from "../../styles/utils/position";
import getColorByName from "../../styles/themeHelpers/getColorByName";
import Icon from "../Icon";

import type { CheckboxVariant } from "./Checkbox";

type VisualCheckboxProps = {
  checked: boolean;
  hasError?: boolean;
  variant?: CheckboxVariant;
};

type VisualCheckboxWrapper = {
  checked: boolean;
  hasError?: boolean;
  variant?: CheckboxVariant;
} & PositionProps;

const getBorderColor = (props: VisualCheckboxProps) => {
  if (props.hasError) {
    return getColorByName("failure");
  } else if (props.checked) {
    return getColorByName("teachersHighlight");
  } else {
    return getColorByName("oakGrey3");
  }
};

const VisualCheckboxWrapper = styled.span<VisualCheckboxWrapper>`
  position: ${(props) =>
    props?.variant === "cardCheckbox" ? "absolute" : "relative"};
  left: ${(props) => (props?.variant === "cardCheckbox" ? "12px" : "initial")};
  top: ${(props) => (props?.variant === "cardCheckbox" ? "12px" : "initial")};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  min-width: 28px;
  height: 28px;
  border-style: solid;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getBorderColor(props)};
  background-color: ${(props) =>
    props.checked
      ? getColorByName("teachersHighlight")
      : getColorByName("white")};
  ${position}
`;

const VisualCheckbox: FC<VisualCheckboxProps> = (props) => {
  return (
    <VisualCheckboxWrapper
      checked={props.checked}
      variant={props.variant}
      data-testid="visual-checkbox"
      hasError={props.hasError}
    >
      {props.checked && (
        <Icon
          name={"tick"}
          $color={"white"}
          size={20}
          data-testid="tick-icon"
        />
      )}
    </VisualCheckboxWrapper>
  );
};

export default VisualCheckbox;
