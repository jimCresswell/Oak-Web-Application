import { screen, waitFor } from "@testing-library/react";

import { WebinarPreview } from "../../../node-lib/cms";
import WebinarListingPage, {
  WebinarListingPageProps,
} from "../../../pages/webinars";
import renderWithProviders from "../../__helpers__/renderWithProviders";

const testWebinarPreview: WebinarPreview = {
  title: "An upcoming webinar",
  id: "5",
  slug: "an-upcoming-webinar",
  summaryPortableText: [],
};

const testWebinarPreview2: WebinarPreview = {
  title: "A past webinar",
  id: "6",
  slug: "a-past-webinar",
  summaryPortableText: [],
};

const webinars = jest.fn(() => [testWebinarPreview, testWebinarPreview2]);

describe("pages/webinar/index.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    jest.mock("../../../node-lib/cms", () => ({
      __esModule: true,
      default: {
        webinars: jest.fn(webinars),
      },
    }));
  });

  describe("WebinarListingPage", () => {
    it("Renders a link to each webinar ", async () => {
      renderWithProviders(
        <WebinarListingPage
          webinars={[testWebinarPreview, testWebinarPreview2]}
        />
      );

      await waitFor(() => {
        expect(
          screen.getByText("An upcoming webinar").closest("a")
        ).toHaveAttribute("href", "/webinars/an-upcoming-webinar");

        expect(screen.getByText("A past webinar").closest("a")).toHaveAttribute(
          "href",
          "/webinars/a-past-webinar"
        );
      });
    });
  });

  describe("getStaticProps", () => {
    it("Should return the webinars from the CMS", async () => {
      const { getStaticProps } = await import("../../../pages/webinars/");
      const propsResult = (await getStaticProps({})) as {
        props: WebinarListingPageProps;
      };

      expect(propsResult?.props?.webinars).toEqual([
        testWebinarPreview,
        testWebinarPreview2,
      ]);
    });
  });
});