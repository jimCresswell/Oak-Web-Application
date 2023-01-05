import React, { FC } from "react";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsResult,
  NextPage,
} from "next";

import { decorateWithIsr } from "../../../../node-lib/isr";
import AppLayout from "../../../../components/AppLayout";
import Flex from "../../../../components/Flex";
import MaxWidth from "../../../../components/MaxWidth/MaxWidth";
import TitleCard from "../../../../components/Card/TitleCard";
import { getSeoProps } from "../../../../browser-lib/seo/getSeoProps";
import { mockFetchLessons } from "../../../../browser-lib/fixtures/lesson";
import Typography, {
  Heading,
  Hr,
  LI,
  UL,
  P,
} from "../../../../components/Typography";
import Button from "../../../../components/Button";
import ExpandingContainer from "../../../../components/ExpandingContainer";
import Box from "../../../../components/Box";
import BrushBorders from "../../../../components/SpriteSheet/BrushSvgs/BrushBorders";
import Card from "../../../../components/Card";
import Grid, { GridArea } from "../../../../components/Grid";
import Icon, { IconName } from "../../../../components/Icon";
import teachersLessonsLessonPathsFixture from "../../../../node-lib/curriculum-api/fixtures/teachersLessonsLessonPaths.fixture";
import OverviewPresentation from "../../../../components/pages/TeachersLessonOverview/OverviewPresentation";
import OverviewVideo from "../../../../components/pages/TeachersLessonOverview/OverviewVideo";

export type LessonOverview = {
  lessonTitle: string;
  lessonSlug: string;
  keyStageTitle: string;
  keyStageSlug: string;
  coreContent: string[];
  subjectTitle: string;
  subjectSlug: string;
  equipmentRequired: string;
  supervisionLevel: string;
  contentGuidance: string;
  video: string;
  signLanguageVideo?: string;
  presentation?: string;
  worksheet?: string;
  transcript?: string[];
};

export type LessonOverviewPageProps = {
  curriculumData: LessonOverview;
};

type HelperProps = {
  helperIcon: IconName;
  helperTitle: string;
  helperDescription: string;
};

const LessonHelper: FC<HelperProps> = ({
  helperIcon,
  helperTitle,
  helperDescription,
}) => {
  return (
    <GridArea $colSpan={[12, 12, 4]}>
      <Card
        $background={"teachersPastelYellow"}
        $flexDirection={"row"}
        $flexWrap={"wrap"}
        $alignItems={"center"}
        $pa={12}
      >
        <Heading $font={"heading-5"} tag={"h3"} $ma={12}>
          <Icon variant="minimal" name={helperIcon} /> {helperTitle}
        </Heading>
        <Typography $font={"body-2"} $ma={12}>
          {helperDescription}
        </Typography>
        <BrushBorders color="teachersPastelYellow" />
      </Card>
    </GridArea>
  );
};

const LessonOverviewPage: NextPage<LessonOverviewPageProps> = ({
  curriculumData,
}) => {
  const {
    lessonTitle,
    keyStageTitle,
    keyStageSlug,
    coreContent,
    subjectSlug,
    subjectTitle,
    equipmentRequired,
    supervisionLevel,
    contentGuidance,
    video,
    signLanguageVideo,
    presentation,
    worksheet,
    transcript,
  } = curriculumData;

  return (
    <AppLayout
      seoProps={getSeoProps({
        title: "Lesson overview", // @todo add real data
        description: "Overview of lesson",
      })}
    >
      <MaxWidth $ph={16}>
        <Flex $mb={36} $display={"inline-flex"} $mt={50}>
          <TitleCard
            page={"lesson"}
            keyStage={keyStageTitle}
            keyStageSlug={keyStageSlug}
            subject={subjectTitle}
            subjectSlug={subjectSlug}
            title={lessonTitle}
            iconName={"Rocket"}
          />
        </Flex>
        <Flex $flexDirection="column">
          <Heading tag={"h2"} $font={"heading-6"} $mb={16}>
            Core content
          </Heading>
          <UL $pl={28}>
            {coreContent.map((contentString) => {
              return <LI $font={"list-item-1"}>{contentString}</LI>;
            })}
          </UL>
        </Flex>
        <Flex $mt={12} $flexWrap={"wrap"}>
          <Button
            $mr={24}
            icon="Save"
            iconBackground="teachersHighlight"
            label="All lesson resources"
            onClick={() => null}
            size="large"
            variant="minimal"
            $iconPosition={"trailing"}
            $mt={16}
          />
          {/*
          todo
           <Button
            $mr={24}
            icon="SendToPupil"
            iconBackground="teachersHighlight"
            label="Send to pupil"
            onClick={() => null}
            size="large"
            variant="minimal"
            $iconPosition={"trailing"}
            $mt={16}
          /> */}
        </Flex>
        <Hr $color={"oakGrey3"} />
        {presentation && (
          <ExpandingContainer
            title={"Presentation"}
            downloadable={true}
            toggleClosed={false}
          >
            <OverviewPresentation
              asset={presentation}
              lessonTitle={lessonTitle}
            />
          </ExpandingContainer>
        )}
        {video && (
          <ExpandingContainer title={"Video"} downloadable={true}>
            <OverviewVideo
              video={video}
              signLanguageVideo={signLanguageVideo}
              lessonTitle={lessonTitle}
            />
          </ExpandingContainer>
        )}
        {worksheet && (
          <ExpandingContainer title={"Worksheet"} downloadable={true}>
            <OverviewPresentation asset={worksheet} lessonTitle={lessonTitle} />
          </ExpandingContainer>
        )}
        <ExpandingContainer title={"Starter quiz"} downloadable={true}>
          <Box>quiz element</Box>
        </ExpandingContainer>
        <ExpandingContainer title={"Exit quiz"} downloadable={true}>
          <Box>quiz element</Box>
        </ExpandingContainer>
        {transcript && (
          <ExpandingContainer title={"Transcript"}>
            <Flex $width={"100%"} $justifyContent={"center"}>
              <Box
                $width={["100%", "70%", "60%"]}
                $maxHeight={[380, 640, 640]}
                $background="oakGrey2"
                $ph={16}
                $pv={32}
                $mt={20}
                $borderRadius={[8, 3, 3]}
              >
                <Box
                  $maxHeight={[320, 580, 580]}
                  $overflowY={"scroll"}
                  $pr={32}
                >
                  {transcript.map((transcriptString) => (
                    <P $mb={[24, 16]} $font={"body-1"}>
                      {transcriptString}
                    </P>
                  ))}
                </Box>
              </Box>
            </Flex>
          </ExpandingContainer>
        )}
        <Hr $color={"oakGrey3"} />
      </MaxWidth>
      <MaxWidth $ph={[0, 16, 16]}>
        <Grid $rg={32} $cg={32} $mv={16}>
          <LessonHelper
            helperTitle={"EquipmentRequired"}
            helperIcon={"EquipmentRequired"}
            helperDescription={equipmentRequired}
          />
          <LessonHelper
            helperTitle={"Supervision Level"}
            helperIcon={"SupervisionLevel"}
            helperDescription={supervisionLevel}
          />
          <LessonHelper
            helperTitle={"Content Guidance"}
            helperIcon={"ContentGuidance"}
            helperDescription={contentGuidance}
          />
        </Grid>
      </MaxWidth>
      <MaxWidth $ph={16}>
        <Hr $color={"oakGrey3"} />
      </MaxWidth>
    </AppLayout>
  );
};

export type URLParams = {
  lessonSlug: string;
};

export const getStaticPaths: GetStaticPaths<URLParams> = async () => {
  const paths = teachersLessonsLessonPathsFixture().map(({ lessonSlug }) => ({
    params: {
      lessonSlug,
    },
  }));

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps<
  LessonOverviewPageProps,
  URLParams
> = async (context) => {
  if (!context.params) {
    throw new Error("No context.params");
  }
  const { lessonSlug } = context.params;

  const curriculumData = mockFetchLessons(lessonSlug);

  if (!curriculumData) {
    return {
      notFound: true,
    };
  }

  const results: GetStaticPropsResult<LessonOverviewPageProps> = {
    props: {
      curriculumData,
    },
  };
  const resultsWithIsr = decorateWithIsr(results);
  return resultsWithIsr;
};

export default LessonOverviewPage;
