import getAvoBridge from "./getAvoBridge";

const hubspot = {
  track: jest.fn(),
  identify: jest.fn(),
};

const posthog = {
  track: jest.fn(),
  identify: jest.fn(),
};

const testEventName = "test-event";
const testEventProperties = {
  org: "oak national",
};

describe("getAvoBridge", () => {
  test("logEvent", () => {
    const avoBridge = getAvoBridge({ hubspot, posthog });
    avoBridge.logEvent(testEventName, testEventProperties);
    expect(hubspot.track).toHaveBeenCalledWith(
      testEventName,
      testEventProperties
    );
    expect(posthog.track).toHaveBeenCalledWith(
      testEventName,
      testEventProperties
    );
  });
});
