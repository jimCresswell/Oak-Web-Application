import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import renderWithTheme from "../../__tests__/__helpers__/renderWithTheme";
import { ProgrammesArray } from "../../pages/beta/teachers/key-stages/[keyStageSlug]/subjects";

import SubjectCardListItem from "./SubjectCardListItem";

const subjectCardListemProps: ProgrammesArray = [
  {
    slug: "biology",
    title: "Biology",
    keyStageSlug: "ks4",
    unitCount: 1,
    programmeSlug: "biology-secondary-ks4",
    tierSlug: null,
  },
];

const subjectSelected = jest.fn();
jest.mock("../../context/Analytics/useAnalytics", () => ({
  __esModule: true,
  default: () => ({
    track: {
      subjectSelected: (...args: unknown[]) => subjectSelected(...args),
    },
  }),
}));

describe("SubjectCardListItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("render a Card with the Name of the Subject", () => {
    renderWithTheme(
      <SubjectCardListItem
        titleTag="h3"
        subject={subjectCardListemProps}
        isAvailable={true}
      />
    );
    expect(screen.getByText("Biology")).toBeInTheDocument();
  });
  test("if available has a link to take you to the corresponding subject page", () => {
    const { getByRole } = renderWithTheme(
      <SubjectCardListItem
        titleTag="h3"
        subject={subjectCardListemProps}
        isAvailable={true}
      />
    );
    const cardClickTarget = getByRole("link", {
      name: "Biology",
    });
    expect(cardClickTarget).toBeInTheDocument();
  });
  test("calls tracking.keyStageSelected once, with correct props", async () => {
    const { getByRole } = renderWithTheme(
      <SubjectCardListItem
        titleTag="h3"
        subject={subjectCardListemProps}
        isAvailable={true}
      />
    );
    const cardClickTarget = getByRole("link", {
      name: "Biology",
    });

    const user = userEvent.setup();
    await user.click(cardClickTarget);

    expect(subjectSelected).toHaveBeenCalledTimes(1);
    expect(subjectSelected).toHaveBeenCalledWith({
      keyStageSlug: "ks4",
      keyStageTitle: "Key stage 4",
      subjectSlug: "biology-secondary-ks4",
      subjectTitle: "Biology",
      analyticsUseCase: ["Teacher"],
    });
  });
});
