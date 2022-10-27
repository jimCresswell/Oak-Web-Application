import { Story } from "@storybook/react";
import { useState } from "react";

import { NavigatedFrom } from "../browser-lib/avo/Avo";
import {
  analyticsContext,
  IdentifyProperties,
  UserId,
} from "../context/Analytics/AnalyticsProvider";

export default function AnalyticsDecorator(Story: Story) {
  const [state] = useState({
    /* eslint-disable @typescript-eslint/no-empty-function */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    identify: (userId: UserId, properties: IdentifyProperties) => {},
    track: {
      planALessonSelected: () => {},
      classroomSelected: () => {},
      teacherHubSelected: () => {},
      developYourCurriculumSelected: () => {},
      notificationSelected: () => {},
      aboutSelected: () => {},
      newsletterSignUpCompleted: () => {},
      videoStarted: () => {},
      videoPaused: () => {},
      videoPlayed: () => {},
      videoFinished: () => {},
      /* eslint-enable @typescript-eslint/no-empty-function */
      NavigatedFrom,
    },
  });

  console.log(typeof Story);

  return (
    <div>
      <analyticsContext.Provider value={state}>
        <Story />
      </analyticsContext.Provider>
    </div>
  );
}
