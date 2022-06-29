import styled from "styled-components";

import responsive from "../../styles/utils/responsive";

type ColSpans = 1 | 2 | 3 | 4 | 6 | 8 | 12;

type GridAreaProps = {
  colSpan: Array<ColSpans>;
  rowSpan?: number;
  order?: Array<number>;
  gridColumnStart?: Array<number>;
  gridColumnEnd?: Array<number>;
};

const GridArea = styled.div<GridAreaProps>`
  display: flex;
  flex-direction: column;
  ${responsive(
    "grid-column",
    (props) => props.colSpan,
    (value) => `span ${value}`
  )};
  ${responsive(
    "order",
    (props) => props.order,
    (value) => value && `${value}`
  )};
  ${responsive("grid-row", (props) =>
    props.rowSpan ? `span ${props.rowSpan}` : "span 1"
  )};
  ${responsive(
    "grid-column-start",
    (props) => props.gridColumnStart,
    (value) => `${value}`
  )};
  ${responsive(
    "grid-column-end",
    (props) => props.gridColumnStart,
    (value) => `${value}`
  )};
`;

export default GridArea;
