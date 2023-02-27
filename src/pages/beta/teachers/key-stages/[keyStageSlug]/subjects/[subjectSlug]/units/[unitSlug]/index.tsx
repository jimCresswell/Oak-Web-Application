import React from "react";
import { NextPage, GetServerSideProps, GetServerSidePropsResult } from "next";

import { getSeoProps } from "../../../../../../../../../browser-lib/seo/getSeoProps";
import AppLayout from "../../../../../../../../../components/AppLayout";
import MaxWidth from "../../../../../../../../../components/MaxWidth/MaxWidth";
import curriculumApi, {
  TeachersKeyStageSubjectUnitsLessonsData,
} from "../../../../../../../../../node-lib/curriculum-api";
import TitleCard from "../../../../../../../../../components/Card/TitleCard";
import usePagination from "../../../../../../../../../components/Pagination/usePagination";
import Box from "../../../../../../../../../components/Box";
import LessonList from "../../../../../../../../../components/UnitAndLessonLists/LessonList";
import ButtonAsLink from "../../../../../../../../../components/Button/ButtonAsLink";
export type LessonListPageProps = {
  curriculumData: TeachersKeyStageSubjectUnitsLessonsData;
};

const LessonListPage: NextPage<LessonListPageProps> = ({ curriculumData }) => {
  const {
    keyStageTitle,
    keyStageSlug,
    unitTitle,
    lessons,
    subjectSlug,
    subjectTitle,
  } = curriculumData;

  const keyStageNum = keyStageSlug.slice(-1);
  const downloadLink = `${process.env.NEXT_PUBLIC_VERCEL_API_URL}/download-asset?type=curriculum-map&id=key-stage-${keyStageNum}-${subjectSlug}&extension=pdf`;

  const paginationProps = usePagination({
    totalResults: lessons.length,
    pageSize: 20,
    items: lessons,
  });

  const { currentPageItems } = paginationProps;

  return (
    <AppLayout
      seoProps={getSeoProps({
        title: "Lesson Listing", // @todo add real data
        description: "Lessons in Unit",
      })}
      $background="white"
    >
      <MaxWidth $ph={16}>
        <TitleCard
          page={"lessons"}
          keyStage={keyStageTitle}
          keyStageSlug={keyStageSlug}
          subjectSlug={subjectSlug}
          subject={subjectTitle}
          title={unitTitle}
          iconName={"Rocket"}
          $mt={48}
          $mb={24}
          $alignSelf={"flex-start"}
        />
        <div>
          <ButtonAsLink
            icon="Download"
            iconBackground="teachersHighlight"
            label="Curriculum download (PDF)"
            href={downloadLink}
            page={null}
            size="large"
            variant="minimal"
            $iconPosition={"trailing"}
          />
        </div>
        <Box $mt={56}>
          <LessonList
            {...curriculumData}
            currentPageItems={currentPageItems}
            paginationProps={paginationProps}
            headingTag={"h2"}
          />
        </Box>
      </MaxWidth>
    </AppLayout>
  );
};

export type URLParams = {
  keyStageSlug: string;
  subjectSlug: string;
  unitSlug: string;
};

export const getServerSideProps: GetServerSideProps<
  LessonListPageProps,
  URLParams
> = async (context) => {
  if (!context.params) {
    throw new Error("no context.params");
  }
  const { keyStageSlug, subjectSlug, unitSlug } = context.params;
  if (!keyStageSlug || !subjectSlug || !unitSlug) {
    throw new Error("unexpected context.params");
  }
  const curriculumData = await curriculumApi.teachersKeyStageSubjectUnitLessons(
    {
      keyStageSlug,
      subjectSlug,
      unitSlug,
    }
  );

  const results: GetServerSidePropsResult<LessonListPageProps> = {
    props: {
      curriculumData,
    },
  };
  return results;
};

export default LessonListPage;
