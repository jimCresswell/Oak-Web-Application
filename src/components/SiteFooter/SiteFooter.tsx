import Link from "next/link";
import { FC } from "react";

import Flex from "../Flex";
import Typography, { Heading, P } from "../Typography";
import MaxWidth from "../MaxWidth/MaxWidth";
import Logo from "../Logo";
import SocialButtons from "../SocialButtons";
import Box from "../Box";
import { useCookieConsent } from "../../browser-lib/cookie-consent/CookieConsentProvider";
import useAnalytics from "../../context/Analytics/useAnalytics";
import UnstyledButton from "../UnstyledButton";
import footerSections from "../../browser-lib/fixtures/footerSections";
import OakLink from "../OakLink";

type FooterLinkProps = {
  text: string;
} & (
  | {
      href: string;
      type?: "link";
    }
  | {
      type: "consent-manager-toggle";
    }
  | {
      type: "pupils-link";
    }
  | {
      type: "teachers-link";
    }
);

const FooterLink: FC<FooterLinkProps> = (props) => {
  const { track } = useAnalytics();
  const { showConsentManager } = useCookieConsent();

  if (props.type === "consent-manager-toggle") {
    return (
      <UnstyledButton onClick={showConsentManager}>{props.text}</UnstyledButton>
    );
  }

  if (props.type === "pupils-link") {
    return (
      <OakLink
        href="https://classroom.thenational.academy"
        htmlAnchorProps={{
          onClick: () => track.classroomSelected({ navigatedFrom: "footer" }),
        }}
      >
        {props.text}
      </OakLink>
    );
  }

  if (props.type === "teachers-link") {
    return (
      <OakLink
        href="https://teachers.thenational.academy"
        htmlAnchorProps={{
          onClick: () => track.teacherHubSelected({ navigatedFrom: "footer" }),
        }}
      >
        {props.text}
      </OakLink>
    );
  }

  return <Link href={props.href}>{props.text}</Link>;
};

export type FooterSection = {
  title: string;
  links: FooterLinkProps[];
};
const FooterSectionLinks: FC<FooterSection> = ({ title, links }) => {
  return (
    <Flex $flexDirection="column">
      <Heading
        $mb={8}
        $fontSize={16}
        $lineHeight="20px"
        $color="grey9"
        tag="h2"
        $fontFamily={"headingLight"}
      >
        {title}
      </Heading>
      <Typography
        $fontSize={[12, 18]}
        $lineHeight={["24px", "32px"]}
        $color="grey9"
      >
        <ul role="list">
          {links.map((link) => (
            <li key={link.text}>
              <FooterLink {...link} />
            </li>
          ))}
        </ul>
      </Typography>
    </Flex>
  );
};

export type FooterSections = Record<
  "pupils" | "teachers" | "oak" | "legal",
  FooterSection
>;

const SiteFooter: FC = () => {
  const sections = footerSections;
  return (
    <Box
      as="footer"
      $zIndex="neutral"
      $width="100%"
      $mt={80}
      $background="white"
    >
      <nav>
        <MaxWidth
          $position={"relative"}
          $justifyContent={"center"}
          $flexDirection={"column"}
          $ph={12}
          $ma={"auto"}
          $width={"100%"}
        >
          <Flex $width={"100%"} $flexWrap={["wrap"]}>
            <Flex $mb={32} $flexGrow={[1, 0]} $mr={48} $flexDirection="column">
              <Flex $mb={16} $flexDirection={"column"}>
                <FooterSectionLinks {...sections.pupils} />
              </Flex>
              <Flex $mb={16} $flexDirection={"column"}>
                <FooterSectionLinks {...sections.teachers} />
              </Flex>
            </Flex>

            <Flex
              $flexGrow={[1, 0]}
              $flexDirection="column"
              $mb={[24, 0]}
              $mr={48}
            >
              <FooterSectionLinks {...sections.oak} />
            </Flex>

            <Flex $flexDirection="column">
              <FooterSectionLinks {...sections.legal} />
            </Flex>

            <Flex
              $flexDirection={"column"}
              $justifyContent={"space-between"}
              $alignItems={"flex-end"}
              $flexGrow={[0, 1]}
              $ml={"auto"}
            >
              <Logo title={"Oak National Academy"} height={66} width={150} />
            </Flex>
          </Flex>
          <Flex $mb={80} $mt={64} $width={"100%"}>
            <SocialButtons />
            <Flex $alignItems={"center"}>
              <P $lineHeight={"16px"} $textAlign="center" $fontSize={[12, 16]}>
                © Oak National Academy
              </P>
            </Flex>
          </Flex>
        </MaxWidth>
      </nav>
    </Box>
  );
};

export default SiteFooter;
