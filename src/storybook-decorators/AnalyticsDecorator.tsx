import { Story } from "@storybook/react";

import { NavigatedFrom } from "../browser-lib/avo/Avo";
import { analyticsContext } from "../context/Analytics/AnalyticsProvider";
import noop from "../__tests__/__helpers__/noop";

export default function AnalyticsDecorator(Story: Story) {
  const value = {
    identify: noop,
    track: {
      planALessonSelected: noop,
      classroomSelected: noop,
      teacherHubSelected: noop,
      developYourCurriculumSelected: noop,
      supportYourTeamSelected: noop,
      notificationSelected: noop,
      aboutSelected: noop,
      newsletterSignUpCompleted: noop,
      videoStarted: noop,
      videoPaused: noop,
      videoPlayed: noop,
      videoFinished: noop,
      NavigatedFrom,
    },
  };

  return (
    <analyticsContext.Provider value={value}>
      <Story />
    </analyticsContext.Provider>
  );
}
