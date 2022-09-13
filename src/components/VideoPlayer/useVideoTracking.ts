import { useState } from "react";

import errorReporter from "../../common-lib/error-reporter";
import useAnalytics from "../../context/Analytics/useAnalytics";

const reportError = errorReporter("useVideoTracking");

/**
 * Sends a warning to bugsnag if props are malformed so don't call this every
 * render, instead call it when a track event is called
 * @todo use zod for this
 */
const getEventPropsOrWarn = (props: UseVideoTrackingProps) => {
  const state = props.getState();
  const { duration, captioned, playbackId, title, timeElapsed, muted } = state;

  if (typeof duration !== "number" || typeof timeElapsed !== "number") {
    const error = new Error("Could not track video event, props malformed");
    reportError(error, props);
    return;
  }

  return {
    durationSeconds: duration,
    isCaptioned: captioned,
    isMuted: muted,
    timeElapsedSeconds: timeElapsed,
    videoTitle: playbackId,
    videoPlaybackId: title,
  };
};

type UseVideoTrackingProps = {
  getState: () => {
    captioned: boolean;
    duration: number | null;
    muted: boolean;
    playbackId: string;
    timeElapsed: number | null;
    title: string;
  };
};
const useVideoTracking = (props: UseVideoTrackingProps) => {
  const { track } = useAnalytics();
  const [started, setStarted] = useState(false);

  const onPlay = () => {
    const eventProps = getEventPropsOrWarn(props);
    if (!eventProps) {
      return;
    }
    track.videoPlayed(eventProps);
    if (!started) {
      track.videoStarted(eventProps);
      setStarted(true);
    }
  };
  const onPause = () => {
    const eventProps = getEventPropsOrWarn(props);
    if (!eventProps) {
      return;
    }
    track.videoPaused(eventProps);
  };
  const onEnd = () => {
    const eventProps = getEventPropsOrWarn(props);
    if (!eventProps) {
      return;
    }
    track.videoFinished(eventProps);
  };

  return {
    onPlay,
    onEnd,
    onPause,
  };
};

export default useVideoTracking;