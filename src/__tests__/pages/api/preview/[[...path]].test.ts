import handler from "../../../../pages/api/preview/[[...path]]";
import { createNextApiMocks } from "../../../__helpers__/createNextApiMocks";

const createReqRes = (path: string[], secret = "SANITY_PREVIEW_SECRET") => {
  const { req, res } = createNextApiMocks({
    query: {
      path,
      secret,
    },
  });

  res.setPreviewData = jest.fn();

  return { req, res };
};

describe("/api/preview/[[...path]]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it("should redirect to the desired path", async () => {
    const { req, res } = createReqRes(["webinars", "some-webinar"]);
    await handler(req, res);

    expect(res._getStatusCode()).toBe(307);
    expect(res.getHeaders()).toMatchObject({
      location: "/webinars/some-webinar",
    });
  });

  it("should reject an invalid path", async () => {
    const { req, res } = createReqRes(["https://", "google.com"]);
    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(res.getHeaders().location).toBeUndefined();
  });

  it("should reject an invalid preview secret", async () => {
    const { req, res } = createReqRes(
      ["https://", "google.com"],
      "invalid-secret"
    );
    await handler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(res.getHeaders().location).toBeUndefined();
  });
});