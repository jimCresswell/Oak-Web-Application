import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import useAnalytics from "../context/Analytics/useAnalytics";
import useAnalyticsUseCase from "../hooks/useAnalyticsUseCase";
import type { PageNameValueType } from "../browser-lib/avo/Avo";

type UseTrackPageViewProps = {
  pageName: PageNameValueType;
};

const useTrackPageView = ({ pageName }: UseTrackPageViewProps) => {
  const { track } = useAnalytics();
  const router = useRouter();
  const analyticsUseCase = useAnalyticsUseCase();

  const [isTrackPageViewCalled, setIsTrackPageViewCalled] = useState(false);

  useEffect(() => {
    !isTrackPageViewCalled &&
      track.pageView({
        linkUrl: router.pathname,
        pageName: [pageName],
        analyticsUseCase,
      });

    setIsTrackPageViewCalled(true);
  }, [
    analyticsUseCase,
    track,
    pageName,
    router.pathname,
    isTrackPageViewCalled,
  ]);

  return;
};

export default useTrackPageView;
