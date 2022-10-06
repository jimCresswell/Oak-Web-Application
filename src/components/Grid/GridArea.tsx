import styled from "styled-components";

import responsive, { ResponsiveValues } from "../../styles/utils/responsive";
import { SpacingProps } from "../../styles/utils/spacing";
import Flex, { FlexProps } from "../Flex";

type ColSpans = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 12;

type GridAreaProps = {
  $colSpan: Array<ColSpans>;
  $rowSpan?: number;
  $order?: ResponsiveValues<number>;
} & SpacingProps;

const GridArea = styled(Flex)<GridAreaProps & FlexProps>`
  flex-direction: column;
  ${responsive(
    "grid-column",
    (props) => props.$colSpan,
    (value) => `span ${value}`
  )};
  ${responsive(
    "order",
    (props) => props.$order,
    (value) => value && `${value}`
  )};
  ${responsive("grid-row", (props) =>
    props.$rowSpan ? `span ${props.$rowSpan}` : "span 1"
  )};
`;

export default GridArea;
