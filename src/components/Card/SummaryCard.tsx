import { FC } from "react";
import { PortableText } from "@portabletext/react";
import type { PortableTextSpan } from "@portabletext/types";
import styled from "styled-components";

import Flex from "../Flex";
import Typography, { Heading } from "../Typography";
import { OakColorName } from "../../styles/theme/types";
import { getBreakpoint } from "../../styles/utils/responsive";

import Card from "./Card";
import CardImage, { CardImageProps } from "./CardComponents/CardImage";

const ImageWrap = styled(Flex)`
  @media (max-width: ${getBreakpoint("medium")}px) {
    display: none;
  }
`;

type SummaryCardProps = {
  title: string;
  heading: string;
  summary: PortableTextSpan | string;
  background: OakColorName;
};

/**
 * Contains an heading, title, and image.
 * image disapears on mobile
 *
 * ## Usage
 * Summary card heading used at the top of page
 */
const SummaryCard: FC<SummaryCardProps & CardImageProps> = ({
  title,
  heading,
  summary,
  imageSrc,
  alt,
  background,
}) => {
  return (
    <Card
      $background={background}
      $flexDirection={"row"}
      $justifyContent={"space-between"}
    >
      <Flex $flexDirection={"column"}>
        <Heading $mb={16} tag={"h2"} $fontSize={20} $color={"oakGrey4"}>
          {title}
        </Heading>
        <Heading $mb={16} $color={"black"} $fontSize={[24, 32, 32]} tag={"h1"}>
          {heading}
        </Heading>
        <Typography $color="black" $fontSize={16}>
          {typeof summary === "string" ? (
            <p>{summary}</p>
          ) : (
            <PortableText value={summary} />
          )}
        </Typography>
      </Flex>
      <ImageWrap
        $width={"100%"}
        $alignItems={"center"}
        $justifyContent={"center"}
      >
        <CardImage
          alt={alt}
          imageSrc={imageSrc}
          position={"center right"}
        ></CardImage>
      </ImageWrap>
    </Card>
  );
};

export default SummaryCard;
