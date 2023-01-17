import renderWithTheme from "../../../__tests__/__helpers__/renderWithTheme";

import OverviewTranscript, {
  splitTextIntoSentences,
} from "./OverviewTranscript";

const transcript =
  "- Hello again, it's me, Mrs. Wade! This is our second lesson together, and today we're going to look at our rights. Let's get started.";

describe("OverviewTranscript", () => {
  test("it renders", () => {
    const { getByTestId } = renderWithTheme(
      <OverviewTranscript transcript={transcript} />
    );

    getByTestId("transcript");
  });

  test("splitTextIntoSentences formats transcript string correctly", () => {
    const fromattedTranscript = [
      "- Hello again, it's me, Mrs. Wade!",
      " This is our second lesson together, and today we're going to look at our rights.",
      " Let's get started.",
      "",
    ];

    expect(splitTextIntoSentences(transcript)).toEqual(fromattedTranscript);
  });
});