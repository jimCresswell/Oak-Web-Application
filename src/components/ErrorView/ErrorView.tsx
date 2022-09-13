import { FC } from "react";
import styled from "styled-components";

import { DEFAULT_SEO_PROPS } from "../../browser-lib/seo/Seo";
import Button from "../Button";
import ButtonAsLink from "../Button/ButtonAsLink";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import Flex from "../Flex";
import Layout from "../Layout";
import { HeaderVariant, FooterVariant } from "../Layout/Layout";
import MaxWidth from "../MaxWidth/MaxWidth";
import { P, Heading } from "../Typography";

const shadow =
  "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000";

const ErrorHeading = styled(Heading)`
  color: white;
  font-size: 120px;
  text-shadow: ${shadow};
`;

type ErrorViewProps = {
  onBackClick?: () => void;
  statusCode?: number;
  headerVariant?: HeaderVariant;
  footerVariant?: FooterVariant;
};
const ErrorView: FC<ErrorViewProps> = (props) => {
  const { onBackClick, statusCode, headerVariant, footerVariant } = props;
  return (
    <Layout
      seoProps={DEFAULT_SEO_PROPS}
      headerVariant={headerVariant}
      footerVariant={footerVariant}
    >
      <MaxWidth $alignItems={"flex-end"}>
        <Flex
          $mv={80}
          $flexDirection={"column"}
          $width={["100%", "50%"]}
          $ph={16}
        >
          <Flex
            data-testid="errorStatus"
            $justifyContent={["flex-end", "flex-start"]}
          >
            {statusCode ? (
              <ErrorHeading $fontSize={56} tag="h1">
                {statusCode}
              </ErrorHeading>
            ) : (
              <Heading $fontSize={24} $mb={12} tag="h1">
                An error occurred
              </Heading>
            )}
          </Flex>

          <Heading $mb={48} $fontSize={[24, 32]} tag={"h2"}>
            Whoops! It looks like you have fallen too far from the tree.
          </Heading>

          <P $mb={24}>Let's get you back to browsing</P>
          <ButtonGroup>
            {onBackClick && (
              <Button
                onClick={onBackClick}
                variant="minimal"
                icon="ChevronLeft"
                label={"Go back"}
                iconBackground={"black"}
              />
            )}
            <ButtonAsLink
              data-testid="homeButton"
              variant="minimal"
              icon="Home"
              label={"Home"}
              href={"/"}
              iconBackground={"black"}
            />
          </ButtonGroup>
        </Flex>
      </MaxWidth>
    </Layout>
  );
};

export default ErrorView;