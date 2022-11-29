import { BrushSvgName } from "./BrushSvgs";
import { BubbleSvgName } from "./BubbleSvgs";
import { GraphicSvgName } from "./GraphicSvgs";
import { IconSvgName } from "./IconSvgs";
import { LessonElementSvgName } from "./LessonElementSvgs";
import { LoopingLineSvgName } from "./LoopingLineSvgs";

export type SvgProps = {
  id: string; // @todo type this
};

export type SvgName =
  | IconSvgName
  | GraphicSvgName
  | LessonElementSvgName
  | BrushSvgName
  | LoopingLineSvgName
  | BubbleSvgName
  | "looping-arrow-1"

  // @todo name the below types
  | "icon-brush-background"
  | "box-border-top"
  | "box-border-right"
  | "box-border-bottom"
  | "box-border-left"
  | "brush-border-top"
  | "brush-border-right"
  | "brush-border-bottom"
  | "brush-border-left"
  | "button-border-top"
  | "button-border-right"
  | "button-border-bottom"
  | "button-border-left"
  | "hr";

type GetSvgIdProps = {
  name: SvgName;
};
const getSvgId = ({ name }: GetSvgIdProps) => {
  return `svg-sprite-${name}`;
};

export default getSvgId;
