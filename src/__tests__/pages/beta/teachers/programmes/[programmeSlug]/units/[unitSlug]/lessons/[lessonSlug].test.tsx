import { act, screen } from "@testing-library/react";
import { GetStaticPropsContext, PreviewData } from "next";

import renderWithSeo from "../../../../../../../../__helpers__/renderWithSeo";
import { mockSeoResult } from "../../../../../../../../__helpers__/cms";
import renderWithProviders from "../../../../../../../../__helpers__/renderWithProviders";
import lessonOverviewFixture from "../../../../../../../../../node-lib/curriculum-api/fixtures/lessonOverview.fixture";
import tierListingFixture from "../../../../../../../../../node-lib/curriculum-api/fixtures/tierListing.fixture";
import LessonOverviewPage, {
  getStaticProps,
  LessonOverviewPageProps,
  URLParams,
} from "../../../../../../../../../pages/beta/teachers/programmes/[programmeSlug]/units/[unitSlug]/lessons/[lessonSlug]";

const props = {
  curriculumData: lessonOverviewFixture({
    videoMuxPlaybackId: "pid-001",
    videoWithSignLanguageMuxPlaybackId: "pid-002",
    hasDownloadableResources: true,
  }),
  tierData: tierListingFixture(),
};

const render = renderWithProviders();

describe("pages/beta/teachers/lessons", () => {
  it("Renders title from the props", async () => {
    render(<LessonOverviewPage {...props} />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Islamic Geometry"
    );
  });

  it("renders sign language button if there is a sign language video", async () => {
    render(<LessonOverviewPage {...props} />);

    expect(screen.getByTestId("sign-language-button")).toHaveTextContent(
      "Signed video"
    );
  });

  it("renders Download All button if lesson has downloadable resources", async () => {
    render(<LessonOverviewPage {...props} />);

    expect(screen.getByTestId("download-all-button")).toHaveTextContent(
      "Download all resources"
    );
  });

  it("sign language button toggles on click", async () => {
    render(<LessonOverviewPage {...props} />);

    const signLanguageButton = screen.getByTestId("sign-language-button");
    act(() => {
      signLanguageButton.click();
    });
    expect(screen.getByTestId("sign-language-button")).toHaveTextContent(
      "Unsigned"
    );
  });

  it("renders an iframe for a presentation and worksheet", async () => {
    const { getAllByTestId } = render(<LessonOverviewPage {...props} />);
    const iframeElement = getAllByTestId("overview-presentation");
    expect(iframeElement.length).toEqual(2);
  });
  it("breadcrumb url for subjects with more than one programme go to programme index page ", async () => {
    const { getByText } = render(<LessonOverviewPage {...props} />);
    const subjectBreadcrumb = getByText("Maths");
    expect(subjectBreadcrumb).toHaveAttribute(
      "href",
      "/beta/teachers/key-stages/ks4/subjects/maths/programmes"
    );
  });
  it("breadcrumb url for subjects with one programme go to unit index page ", async () => {
    const { getByText } = render(
      <LessonOverviewPage
        curriculumData={props.curriculumData}
        tierData={{
          programmes: [
            {
              slug: "computing",
              title: "Computing",
              keyStageSlug: "ks4",
              keyStageTitle: "Key stage 4",
              activeLessonCount: 112,
              totalUnitCount: 15,
              programmeSlug: "computing-secondary-ks4",
              tierSlug: null,
              tierTitle: null,
            },
          ],
        }}
      />
    );
    const subjectBreadcrumb = getByText("Maths");
    expect(subjectBreadcrumb).toHaveAttribute(
      "href",
      "/beta/teachers/programmes/maths-higher-ks4/units"
    );
  });

  describe("SEO", () => {
    it("renders the correct SEO details", async () => {
      const { seo } = renderWithSeo()(<LessonOverviewPage {...props} />);

      expect(seo).toEqual({
        ...mockSeoResult,
        ogSiteName: "NEXT_PUBLIC_SEO_APP_NAME",
        title: "Lesson overview | NEXT_PUBLIC_SEO_APP_NAME",
        description: "Overview of lesson",
        ogTitle: "Lesson overview | NEXT_PUBLIC_SEO_APP_NAME",
        ogDescription: "Overview of lesson",
        ogUrl: "NEXT_PUBLIC_SEO_APP_URL",
        canonical: "NEXT_PUBLIC_SEO_APP_URL",
        robots: "noindex,nofollow",
      });
    });
  });
  describe("getServerSideProps", () => {
    it("Should fetch the correct data", async () => {
      const propsResult = (await getStaticProps({
        params: {
          lessonSlug: "macbeth-lesson-1",
          programmeSlug: "english-primary-ks2",
          unitSlug: "shakespeare",
        },
        query: {},
      } as GetStaticPropsContext<URLParams, PreviewData>)) as {
        props: LessonOverviewPageProps;
      };

      expect(propsResult.props.curriculumData.lessonSlug).toEqual(
        "macbeth-lesson-1"
      );
    });
    it("should throw error", async () => {
      await expect(
        getStaticProps({} as GetStaticPropsContext<URLParams, PreviewData>)
      ).rejects.toThrowError("No context.params");
    });
  });
});
