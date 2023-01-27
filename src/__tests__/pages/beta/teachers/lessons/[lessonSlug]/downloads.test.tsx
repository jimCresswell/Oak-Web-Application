import { screen } from "@testing-library/react";
import { GetServerSidePropsContext, PreviewData } from "next";

import renderWithSeo from "../../../../../__helpers__/renderWithSeo";
import { mockSeoResult } from "../../../../../__helpers__/cms";
import renderWithProviders from "../../../../../__helpers__/renderWithProviders";
import teachersLessonOverviewFixture from "../../../../../../node-lib/curriculum-api/fixtures/teachersLessonOverview.fixture";
import LessonDownloadsPage, {
  getServerSideProps,
  LessonDownloadsPageProps,
  URLParams,
} from "../../../../../../pages/beta/teachers/key-stages/[keyStageSlug]/subjects/[subjectSlug]/units/[unitSlug]/lessons/[lessonSlug]/downloads";

const props = {
  curriculumData: teachersLessonOverviewFixture({
    videoMuxPlaybackId: "pid-001",
    videoWithSignLanguageMuxPlaybackId: "pid-002",
  }),
};

describe("pages/beta/teachers/lessons/[lessonSlug]/downloads", () => {
  it("Renders title from the props with added 'Downloads' text in front of it", async () => {
    renderWithProviders(<LessonDownloadsPage {...props} />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Downloads: Islamic Geometry"
    );
  });

  describe("SEO", () => {
    it("renders the correct SEO details", async () => {
      const { seo } = renderWithSeo(<LessonDownloadsPage {...props} />);

      expect(seo).toEqual({
        ...mockSeoResult,
        ogSiteName: "NEXT_PUBLIC_SEO_APP_NAME",
        title: "Lesson downloads | NEXT_PUBLIC_SEO_APP_NAME",
        description: "Lesson downloads",
        ogTitle: "Lesson downloads | NEXT_PUBLIC_SEO_APP_NAME",
        ogDescription: "Lesson downloads",
        ogUrl: "NEXT_PUBLIC_SEO_APP_URL",
        canonical: "NEXT_PUBLIC_SEO_APP_URL",
      });
    });
  });
  describe("getServerSideProps", () => {
    it("Should fetch the correct data", async () => {
      const propsResult = (await getServerSideProps({
        params: {
          lessonSlug: "macbeth-lesson-1",
          keyStageSlug: "ks2",
          subjectSlug: "english",
          unitSlug: "shakespeare",
        },
        query: {},
      } as GetServerSidePropsContext<URLParams, PreviewData>)) as {
        props: LessonDownloadsPageProps;
      };

      expect(propsResult.props.curriculumData.slug).toEqual("macbeth-lesson-1");
    });
    it("should throw error", async () => {
      await expect(
        getServerSideProps(
          {} as GetServerSidePropsContext<URLParams, PreviewData>
        )
      ).rejects.toThrowError("No context.params");
    });
  });
});