import { z } from "zod";

import sanityGraphqlApi from "../../sanity-graphql";
import planningPageRawFixture from "../../../browser-lib/fixtures/lessonPlanningRaw.json";
import aboutRaw from "../../../browser-lib/fixtures/aboutRaw.json";

import { videoSchema } from "./schemas/base";

import getSanityClient from "./";

jest.mock("../../sanity-graphql");

const mockSanityGraphqlApi = sanityGraphqlApi as jest.MockedObject<
  typeof sanityGraphqlApi
>;

const testWebinar = {
  title: "An upcoming webinar",
  id: "5",
  date: new Date("2025-01-01"),
  slug: { current: "an-upcoming-webinar" },
  hosts: [{ id: "000", name: "Hosty McHostFace" }],
  category: { title: "Some category", slug: { current: "some-category" } },
  summaryPortableText: [],
};

const testLandingPage = {
  id: "001",
  slug: { current: "some-landing-page" },
};

const testVideo = {
  title: "Some video from the library because it's the only one I can find",
  video: {
    asset: {
      assetId: "ByqZ4KA9mLdyrtWnAvRMHbcQnNk2uUnf3NNdahrey5o",
      playbackId: "5VfBnOXD87KnXMJrYNG6HtCIizY6q6thP5EjjqkU1kI",
    },
  },
};

describe("cms/sanity-client", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();

    mockSanityGraphqlApi.allWebinars.mockResolvedValue({
      allWebinar: [testWebinar],
    });
    mockSanityGraphqlApi.webinarBySlug.mockResolvedValue({
      allWebinar: [testWebinar],
    });
    mockSanityGraphqlApi.planningCorePage.mockResolvedValue(
      planningPageRawFixture
    );
    mockSanityGraphqlApi.aboutCorePage.mockResolvedValue(aboutRaw);

    mockSanityGraphqlApi.allLandingPages.mockResolvedValue({
      allLandingPage: [testLandingPage],
    });
    mockSanityGraphqlApi.landingPageBySlug.mockResolvedValue({
      allLandingPage: [testLandingPage],
    });
  });

  describe("webinarsBySlug", () => {
    it("fetches the specified webinar", async () => {
      await getSanityClient().webinarBySlug("an-upcoming-webinar");

      expect(sanityGraphqlApi.webinarBySlug).toBeCalledWith(
        expect.objectContaining({ slug: "an-upcoming-webinar" })
      );
    });

    it("returns a parsed webinar", async () => {
      const result = await getSanityClient().webinarBySlug(
        "an-upcoming-webinar"
      );

      expect(result.slug).toBe("an-upcoming-webinar");
    });

    it("throws when a webinar is invalid", async () => {
      mockSanityGraphqlApi.webinarBySlug.mockResolvedValueOnce(
        {
          allWebinar: [{ slug: "foo" }],
        } as never /* silence error about incorrect slug type */
      );

      await expect(
        getSanityClient().webinarBySlug("an-upcoming-webinar")
      ).rejects.toThrow();
    });

    it("does not fetch draft content by default", async () => {
      getSanityClient().webinarBySlug("an-upcoming-webinar");
      expect(sanityGraphqlApi.webinarBySlug).toBeCalledWith(
        expect.objectContaining({ isDraft: false })
      );
    });

    it("fetches draft content when previewMode flag is passed", async () => {
      getSanityClient().webinarBySlug("an-upcoming-webinar", {
        previewMode: true,
      });
      expect(sanityGraphqlApi.webinarBySlug).toBeCalledWith(
        expect.objectContaining({ isDraft: true })
      );
    });
  });

  describe("webinars", () => {
    it("returns parsed webinars", async () => {
      const result = await getSanityClient().webinars();
      expect(result?.[0]?.slug).toBe("an-upcoming-webinar");
    });

    it("throws when a webinar is invalid", async () => {
      mockSanityGraphqlApi.allWebinars.mockResolvedValueOnce(
        {
          allWebinar: [{ slug: "foo" }],
        } as never /* silence error about incorrect slug type */
      );

      await expect(getSanityClient().webinars()).rejects.toThrow();
    });

    it("does not fetch draft content by default", async () => {
      await getSanityClient().webinars();
      expect(sanityGraphqlApi.allWebinars).toBeCalledWith(
        expect.objectContaining({ isDraft: false })
      );
    });

    it("fetches draft content when previewMode flag is passed", async () => {
      await getSanityClient().webinars({ previewMode: true });
      expect(sanityGraphqlApi.allWebinars).toBeCalledWith(
        expect.objectContaining({ isDraft: true })
      );
    });
  });

  describe("planningPage", () => {
    it("does not fetch draft content by default", async () => {
      await getSanityClient().planningPage();
      expect(sanityGraphqlApi.planningCorePage).toBeCalledWith(
        expect.objectContaining({ isDraft: false })
      );
    });

    it("fetches draft content when previewMode flag is passed", async () => {
      await getSanityClient().planningPage({ previewMode: true });
      expect(sanityGraphqlApi.planningCorePage).toBeCalledWith(
        expect.objectContaining({ isDraft: true })
      );
    });
  });

  describe("landingPageBySlug", () => {
    it("fetches the specified landing page", async () => {
      await getSanityClient().landingPageBySlug("some-landing-page");

      expect(sanityGraphqlApi.landingPageBySlug).toBeCalledWith(
        expect.objectContaining({ slug: "some-landing-page" })
      );
    });

    it("returns a parsed landing page", async () => {
      const result = await getSanityClient().landingPageBySlug(
        "some-landing-page"
      );

      expect(result.slug).toBe("some-landing-page");
    });

    it("throws when a landing page is invalid", async () => {
      mockSanityGraphqlApi.landingPageBySlug.mockResolvedValueOnce(
        {
          allLandingPage: [{ slug: "foo" }],
        } as never /* silence error about incorrect slug type */
      );

      await expect(
        getSanityClient().landingPageBySlug("some-landing-page")
      ).rejects.toThrow();
    });
  });

  describe("landingPages", () => {
    it("returns parsed landing pages", async () => {
      const result = await getSanityClient().landingPages();
      expect(result?.[0]?.slug).toBe("some-landing-page");
    });

    it("throws when a landing page is invalid", async () => {
      mockSanityGraphqlApi.allLandingPages.mockResolvedValueOnce(
        {
          allLandingPage: [{ slug: "foo" }],
        } as never /* silence error about incorrect slug type */
      );

      await expect(getSanityClient().landingPages()).rejects.toThrow();
    });
  });

  describe("videoSchema", () => {
    it("transforms an undefined thumbnail to null", async () => {
      // Serializing `undefined` from getStaticProps causes nextjs errors
      // so explicitly cast it to null
      type video = z.infer<typeof videoSchema>;
      const passResult = videoSchema.safeParse(testVideo) as { data: video };
      expect(passResult.data.video.asset.thumbTime).toBeNull();
    });
  });
});

// Silence module error
export {};
