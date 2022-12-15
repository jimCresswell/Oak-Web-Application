import { TeachersKeyStageSubjectUnitsData } from "..";

const teachersKeyStageSubjectUnitsFixture = (
  partial?: Partial<TeachersKeyStageSubjectUnitsData>
): TeachersKeyStageSubjectUnitsData => {
  return {
    keyStageSlug: "ks4",
    keyStageTitle: "Key stage 4",
    subjectSlug: "maths",
    subjectTitle: "Maths",
    tierSlug: null,
    tiers: [
      {
        title: "Foundation",
        slug: "foundation",
        unitCount: 3,
      },
      {
        title: "Core",
        slug: "core",
        unitCount: 3,
      },
      {
        title: "Higher",
        slug: "higher",
        unitCount: 3,
      },
    ],
    units: [
      {
        slug: "some-unit-slug",
        title: "Unit title",
        keyStageSlug: "4",
        keyStageTitle: "Key stage 4",
        subjectSlug: "maths",
        subjectTitle: "Maths",
        themeSlug: "some-theme-slug",
        themeTitle: "Some theme title",
        lessonCount: 18,
        quizCount: 1,
      },
    ],
    ...partial,
  };
};

export default teachersKeyStageSubjectUnitsFixture;
