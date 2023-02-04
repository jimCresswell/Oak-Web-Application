import React from "react";
import { NextPage, GetServerSideProps, GetServerSidePropsResult } from "next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import AppLayout from "../../../../../../../../../../../components/AppLayout";
import Flex from "../../../../../../../../../../../components/Flex";
import Box from "../../../../../../../../../../../components/Box";
import MaxWidth from "../../../../../../../../../../../components/MaxWidth/MaxWidth";
import TitleCard from "../../../../../../../../../../../components/Card/TitleCard";
import Heading from "../../../../../../../../../../../components/Typography/Heading";
import P from "../../../../../../../../../../../components/Typography/P";
import OakLink from "../../../../../../../../../../../components/OakLink";
import Input from "../../../../../../../../../../../components/Input";
import { getSeoProps } from "../../../../../../../../../../../browser-lib/seo/getSeoProps";
import curriculumApi, {
  TeachersLessonOverviewData,
} from "../../../../../../../../../../../node-lib/curriculum-api";

export type LessonDownloadsPageProps = {
  curriculumData: TeachersLessonOverviewData;
};

const schema = z.object({
  email: z
    .string()
    .email({
      message: "Email not valid",
    })
    .optional()
    .or(z.literal("")),
});

type DownloadFormValues = z.infer<typeof schema>;
export type DownloadFormProps = {
  onSubmit: (values: DownloadFormValues) => Promise<string | void>;
  email: string;
};

const LessonDownloadsPage: NextPage<LessonDownloadsPageProps> = ({
  curriculumData,
}) => {
  const { title, keyStageTitle, keyStageSlug, subjectSlug, subjectTitle } =
    curriculumData;

  const { register, formState } = useForm<DownloadFormProps>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const { errors } = formState;

  return (
    <AppLayout
      seoProps={getSeoProps({
        title: "Lesson downloads", // @todo add real data
        description: "Lesson downloads",
      })}
    >
      <MaxWidth $ph={16}>
        <Flex $mb={8} $display={"inline-flex"} $mt={50}>
          <TitleCard
            page={"lesson"}
            keyStage={keyStageTitle}
            keyStageSlug={keyStageSlug}
            subject={subjectTitle}
            subjectSlug={subjectSlug}
            title={`Downloads: ${title}`}
            iconName={"Rocket"}
          />
        </Flex>
        <Box $maxWidth={[null, 420, 420]}>
          <Heading tag="h2" $font={"heading-5"} $mb={16} $mt={[24, 48]}>
            Your details
          </Heading>
          <Heading
            tag="h3"
            $font={"heading-7"}
            $mt={0}
            $mb={24}
            data-testid="email-heading"
          >
            For regular updates from Oak (optional)
          </Heading>
          <Input
            id={"email"}
            label="Email address:"
            placeholder="Enter email address here"
            {...register("email")}
            error={errors.email?.message}
          />
          <P $font="body-3" $mt={-24}>
            Join our community to get free lessons, resources and other helpful
            content. Unsubscribe at any time. Our{" "}
            <OakLink page={"privacy-policy"}>privacy policy</OakLink>.
          </P>
        </Box>
      </MaxWidth>
    </AppLayout>
  );
};

export type URLParams = {
  lessonSlug: string;
  keyStageSlug: string;
  subjectSlug: string;
  unitSlug: string;
};

export const getServerSideProps: GetServerSideProps<
  LessonDownloadsPageProps,
  URLParams
> = async (context) => {
  if (!context.params) {
    throw new Error("No context.params");
  }
  const { lessonSlug, keyStageSlug, subjectSlug, unitSlug } = context.params;

  const curriculumData = await curriculumApi.teachersLessonOverview({
    lessonSlug,
    keyStageSlug,
    subjectSlug,
    unitSlug,
  });

  if (!curriculumData) {
    return {
      notFound: true,
    };
  }

  const results: GetServerSidePropsResult<LessonDownloadsPageProps> = {
    props: {
      curriculumData,
    },
  };
  return results;
};

export default LessonDownloadsPage;
