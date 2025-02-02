import { screen, waitFor } from "@testing-library/react";

import curriculumApi from "../../../../../../node-lib/curriculum-api/__mocks__";
import SubjectListingPage, {
  getStaticPaths,
  getStaticProps,
} from "../../../../../../pages/beta/teachers/key-stages/[keyStageSlug]/subjects";
import { mockSeoResult } from "../../../../../__helpers__/cms";
import renderWithProviders from "../../../../../__helpers__/renderWithProviders";
import renderWithSeo from "../../../../../__helpers__/renderWithSeo";
import subjectPagePropsFixture from "../../../../../../node-lib/curriculum-api/fixtures/subjectPageProps";

jest.mock("next/dist/client/router", () => require("next-router-mock"));
const props = subjectPagePropsFixture();

describe("pages/key-stages/[keyStageSlug]/subjects", () => {
  it("Renders title from props ", async () => {
    renderWithProviders()(<SubjectListingPage {...props} />);

    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Key stage 4"
      );
    });
  });

  describe("SEO", () => {
    it("renders the correct SEO details", async () => {
      const { seo } = renderWithSeo()(<SubjectListingPage {...props} />);

      expect(seo).toEqual({
        ...mockSeoResult,
        ogSiteName: "NEXT_PUBLIC_SEO_APP_NAME",
        title:
          "Free KS4 Teaching Resources for Lesson Planning | NEXT_PUBLIC_SEO_APP_NAME",
        description: "Key stage by subject",
        ogTitle:
          "Free KS4 Teaching Resources for Lesson Planning | NEXT_PUBLIC_SEO_APP_NAME",
        ogDescription: "Key stage by subject",
        ogUrl: "NEXT_PUBLIC_SEO_APP_URL",
        canonical: "NEXT_PUBLIC_SEO_APP_URL",
        robots: "noindex,nofollow",
      });
    });
  });

  describe("getStaticPaths", () => {
    it("Should return the paths of all keystages", async () => {
      await getStaticPaths();

      expect(curriculumApi.teachersHomePage).toHaveBeenCalled();
    });
  });

  describe("getStaticProps", () => {
    it("Should fetch the correct data", async () => {
      await getStaticProps({
        params: { keyStageSlug: "ks123" },
      });

      expect(curriculumApi.subjectListing).toHaveBeenCalledWith({
        keyStageSlug: "ks123",
      });
    });
  });
});
