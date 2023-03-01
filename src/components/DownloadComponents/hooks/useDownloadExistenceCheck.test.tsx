import { renderHook, waitFor } from "@testing-library/react";

import useDownloadExistenceCheck from "./useDownloadExistenceCheck";

const resources = {
  "exit-quiz-answers": true,
  "worksheet-pdf": true,
};

const getDownloadResourcesExistenceData = {
  resources,
};

const getDownloadResourcesExistenceMock = jest.fn(
  () => getDownloadResourcesExistenceData
);

jest.mock("../helpers/getDownloadResourcesExistence", () => ({
  __esModule: true,
  default: (...args: []) => getDownloadResourcesExistenceMock(...args),
}));

describe("useDownloadExistenceCheck", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("it calls onComplete with correct argument when all resources are available", async () => {
    const lessonSlug = "sampleLesson";
    const resourcesToCheck = resources;
    const onComplete = jest.fn();

    renderHook(() =>
      useDownloadExistenceCheck({ lessonSlug, resourcesToCheck, onComplete })
    );

    await waitFor(() => {
      expect(getDownloadResourcesExistenceMock).toBeCalledTimes(1);
      expect(getDownloadResourcesExistenceMock).toBeCalledWith(
        lessonSlug,
        "exit-quiz-answers,worksheet-pdf"
      );
    });

    expect(onComplete).toBeCalledTimes(1);
    expect(onComplete).toBeCalledWith({
      "exit-quiz-answers": false,
      "worksheet-pdf": false,
    });
  });

  test("it calls onComplete with correct argument when resource is not available", async () => {
    const lessonSlug = "sampleLesson";
    const resourcesToCheck = resources;
    const onComplete = jest.fn();

    getDownloadResourcesExistenceMock.mockImplementationOnce(() => ({
      resources: {
        "exit-quiz-answers": false,
        "worksheet-pdf": true,
      },
    }));

    renderHook(() =>
      useDownloadExistenceCheck({ lessonSlug, resourcesToCheck, onComplete })
    );

    await waitFor(() => {
      expect(onComplete).toBeCalledWith({
        "worksheet-pdf": false,
      });
    });
  });

  test.todo("it calls Bugsnug if there is an error");
});