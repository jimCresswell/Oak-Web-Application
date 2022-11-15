import { FC } from "react";

import Box from "../Box";
import Flex, { FlexProps } from "../Flex";
import OutlineHeading from "../OutlineHeading";
import Svg from "../Svg";
import { Heading } from "../Typography";
import { OakColorName } from "../../styles/theme/types";

type BubbleMessageProps = {
  outlineHeading: string;
  heading: string;
  subHeading: string;
  variant: "Bubble" | "Bubble2";
  background: OakColorName;
};

const BubbleMessage: FC<BubbleMessageProps & FlexProps> = ({
  outlineHeading,
  heading,
  subHeading,
  variant,
  background,
  ...props
}) => {
  return (
    <Flex
      $alignItems={"center"}
      $flexDirection={"column"}
      $position={"relative"}
      $minHeight={360}
      $width={380}
      $justifyContent={"center"}
      {...props}
    >
      <Svg name={variant} $color={background} $cover />
      <Flex
        $width={320}
        $alignItems={"center"}
        $flexDirection={"column"}
        $zIndex={"inFront"}
      >
        <OutlineHeading tag={"h2"} $fontSize={100}>
          {outlineHeading}
        </OutlineHeading>
        <Heading $mt={-20} $textAlign={"center"} $font={"heading-4"} tag={"h3"}>
          {heading}
        </Heading>
        <Box $mt={4} $maxWidth={300}>
          <Heading $textAlign={"center"} $font={"heading-light-6"} tag={"h4"}>
            {subHeading}
          </Heading>
        </Box>
      </Flex>
    </Flex>
  );
};

export default BubbleMessage;
