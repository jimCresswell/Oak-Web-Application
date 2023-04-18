import { UnitListingData } from "..";

const unitListingFixture = (
  partial?: Partial<UnitListingData>
): UnitListingData => {
  return {
    keyStageSlug: "ks1",
    keyStageTitle: "Key stage 1",
    subjectSlug: "art",
    subjectTitle: "Art",
    tierSlug: null,
    tierTitle: null,
    totalUnitCount: 20,
    activeLessonCount: 40,
    units: [
      {
        slug: "some-unit-slug",
        title: "Unit title",
        keyStageSlug: "ks1",
        keyStageTitle: "Key stage 1",
        subjectSlug: "art",
        subjectTitle: "Art",
        themeSlug: "some-theme-slug",
        themeTitle: "Some theme title",
        lessonCount: 18,
        quizCount: 1,
        unitStudyOrder: 1,
        year: "Year 7",
        expired: false,
        expiredLessonCount: null,
      },
    ],
    tiers: [],
    ...partial,
  };
};

export default unitListingFixture;
