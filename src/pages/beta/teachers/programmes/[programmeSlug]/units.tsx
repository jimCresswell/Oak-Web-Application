import React from "react";
// import { useTheme } from "styled-components";
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from "next";
// import { useRouter } from "next/router";

import useTrackPageView from "../../../../../hooks/useTrackPageView";
// import type { KeyStageTitleValueType } from "../../../../../browser-lib/avo/Avo";
import AppLayout from "../../../../../components/AppLayout";
import Flex from "../../../../../components/Flex";
import MaxWidth from "../../../../../components/MaxWidth/MaxWidth";
import TitleCard from "../../../../../components/Card/SubjectUnitLessonTitleCard";
import { getSeoProps } from "../../../../../browser-lib/seo/getSeoProps";
import usePagination from "../../../../../components/Pagination/usePagination";
import curriculumApi, {
  UnitListingData,
} from "../../../../../node-lib/curriculum-api";
import UnitList from "../../../../../components/UnitAndLessonLists/UnitList";
import Grid, { GridArea } from "../../../../../components/Grid";
import Box from "../../../../../components/Box";
// import LearningThemeFilters from "../../../../../components/Filters/LearningThemeFilters";
// import MobileFilters from "../../../../../components/MobileFilters";
import { Heading } from "../../../../../components/Typography";
import TabularNav from "../../../../../components/TabularNav";
// import SubjectTierListing from "../../../../../components/SubjectTierListing/SubjectTierListing";
import Breadcrumbs from "../../../../../components/Breadcrumbs";
import CurriculumDownloadButton from "../../../../../components/CurriculumDownloadButtons/CurriculumDownloadButton";

export type UnitListingPageProps = {
  curriculumData: UnitListingData;
  // learningThemeSlug: string | null;
};

const UnitListingPage: NextPage<UnitListingPageProps> = ({
  curriculumData,
}) => {
  const {
    keyStageTitle,
    keyStageSlug,
    subjectTitle,
    subjectSlug,
    tierSlug,
    // tierTitle,
    // totalUnitCount,
    // activeLessonCount,
    tiers,
    units,
  } = curriculumData;

  useTrackPageView({ pageName: "Unit Listing" });

  // function isString(x: unknown): x is string {
  //   return typeof x === "string";
  // }

  // const tierQuery = isString(tier) ? tier : null;

  const paginationProps = usePagination({
    totalResults: curriculumData.units.length,
    pageSize: 20,
    items: units,
  });

  const { currentPageItems } = paginationProps;
  // const theme = useTheme();

  // const HEADER_HEIGHT = theme.header.height;

  // const learningThemesId = useId();
  // const learningThemesFilterId = useId();

  const tiersSEO = {
    ...getSeoProps({
      title: `${keyStageTitle} ${subjectTitle} tiers`,
      description: `We have resources for tiers: ${tiers
        .map((tier) => tier.tierTitle)
        .join(", ")}`,
    }),
    ...{ noFollow: true, noIndex: true },
  };

  const unitsSEO = {
    ...getSeoProps({
      title: "Units", // @todo add real data
      description: "Programme units",
    }),
    ...{ noFollow: true, noIndex: true },
  };

  return (
    <AppLayout seoProps={tierSlug ? tiersSEO : unitsSEO}>
      <MaxWidth $ph={16}>
        <Box $mv={[24, 48]}>
          {" "}
          <Breadcrumbs
            breadcrumbs={[
              { oakLinkProps: { page: "beta-teachers-home" }, label: "Home" },
              {
                oakLinkProps: { page: "subject-index", slug: keyStageSlug },
                label: keyStageTitle,
              },
              {
                oakLinkProps: {
                  page: "unit-index",
                  keyStage: keyStageSlug,
                  subject: subjectSlug,
                },
                label: subjectTitle,
                disabled: true,
              },
            ]}
          />
        </Box>

        <TitleCard
          page={"subject"}
          keyStage={keyStageTitle}
          keyStageSlug={keyStageSlug}
          title={subjectTitle}
          slug={subjectSlug}
          $mt={0}
          $mb={24}
          $alignSelf={"flex-start"}
        />
        <CurriculumDownloadButton
          keyStageSlug={keyStageSlug}
          keyStageTitle={keyStageTitle}
          subjectSlug={subjectSlug}
          subjectTitle={subjectTitle}
          tier={tierSlug}
        />

        <Grid>
          {/* <GridArea $order={[0, 2]} $colSpan={[12, 4, 3]} $pl={[32]}>
            <Box
              $display={["none", "block"]}
              $position={[null, "sticky"]}
              $top={[null, HEADER_HEIGHT]}
              $mt={[0, 24]}
              $pt={[48]}
            >
              {learningThemes.length > 1 && (
                <Flex $flexDirection={"column"}>
                  <Heading
                    id={learningThemesId}
                    tag="h3"
                    $font="body-3"
                    $mb={16}
                  >
                    Learning themes
                  </Heading>
                  <LearningThemeFilters
                    labelledBy={learningThemesId}
                    learningThemes={learningThemes}
                    selectedThemeSlug={
                      learningThemeSlug ? learningThemeSlug : "all"
                    }
                    linkProps={{
                      page: "unit-index",
                      keyStage: keyStageSlug,
                      subject: subjectSlug,
                      search: { tier: tierQuery },
                    }}
                    trackingProps={{
                      keyStageSlug,
                      keyStageTitle: keyStageTitle as KeyStageTitleValueType,
                      subjectTitle,
                      subjectSlug,
                    }}
                  />
                </Flex>
              )}
            </Box>
          </GridArea> */}

          <GridArea $order={[1, 0]} $colSpan={[12, 8, 9]} $mt={[16, 56]}>
            <Flex $flexDirection={["column-reverse", "column"]}>
              <Flex
                $flexDirection={"row"}
                $minWidth={"100%"}
                $justifyContent={"space-between"}
                $position={"relative"}
                $alignItems={"center"}
                $mb={16}
              >
                <Flex $position={["absolute", "relative"]}>
                  <Heading $font={["heading-6", "heading-5"]} tag={"h2"}>
                    Units
                  </Heading>
                </Flex>
                {/* {learningThemes.length > 1 && (
                  <MobileFilters
                    providedId={learningThemesFilterId}
                    label="Learning themes"
                    $mt={0}
                  >
                    <LearningThemeFilters
                      labelledBy={learningThemesFilterId}
                      learningThemes={learningThemes}
                      selectedThemeSlug={
                        learningThemeSlug ? learningThemeSlug : "all"
                      }
                      linkProps={{
                        page: "unit-index",
                        keyStage: keyStageSlug,
                        subject: subjectSlug,
                        search: { tier: tierQuery },
                      }}
                      trackingProps={{
                        keyStageSlug,
                        keyStageTitle: keyStageTitle as KeyStageTitleValueType,
                        subjectTitle,
                        subjectSlug,
                      }}
                    />
                  </MobileFilters>
                )} */}
              </Flex>

              {tiers.length > 0 && (
                <nav aria-label="tiers" data-testid="tiers-nav">
                  <TabularNav
                    $mb={[10, 16]}
                    label="tiers"
                    links={tiers.map(
                      ({
                        tierTitle: title,
                        tierSlug: slug,
                        unitCount,
                        tierProgrammeSlug,
                      }) => ({
                        label: `${title} (${unitCount})`,
                        programme: tierProgrammeSlug,
                        page: "programme",
                        isCurrent: tierSlug === slug,
                        currentStyles: ["color", "text-underline"],
                      })
                    )}
                  />
                </nav>
              )}
            </Flex>
            <UnitList
              {...curriculumData}
              currentPageItems={currentPageItems}
              paginationProps={paginationProps}
            />
          </GridArea>
        </Grid>
      </MaxWidth>
    </AppLayout>
  );
};

export type URLParams = {
  programmeSlug: string;
};

export const getServerSideProps: GetServerSideProps<
  UnitListingPageProps,
  URLParams
> = async (context) => {
  if (!context.params) {
    throw new Error("No context.params");
  }
  const { programmeSlug } = context.params;

  // const learningTheme = context.query["learning-theme"]
  //   ? context.query["learning-theme"]
  //   : null;
  // const learningThemeSlug = Array.isArray(learningTheme)
  //   ? learningTheme[0]
  //     ? learningTheme[0]
  //     : null
  //   : learningTheme;

  const curriculumData = await curriculumApi.unitListing({
    programmeSlug,
  });

  const results: GetServerSidePropsResult<UnitListingPageProps> = {
    props: {
      curriculumData,
    },
  };
  return results;
};

export default UnitListingPage;
