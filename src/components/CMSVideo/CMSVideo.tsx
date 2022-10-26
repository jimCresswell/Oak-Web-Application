import { FC } from "react";

import { Video } from "../../common-lib/cms-types";
import VideoPlayer from "../VideoPlayer";
import { VideoPlayerProps } from "../VideoPlayer/VideoPlayer";

type OtherVideoPlayerProps = Partial<
  Omit<VideoPlayerProps, "thumbnailTime" | "playbackId">
>;
type CMSVideoProps = OtherVideoPlayerProps & { video: Video };

const CMSVideo: FC<CMSVideoProps> = ({ video, ...rest }) => {
  return (
    <VideoPlayer
      thumbnailTime={video.video.asset.thumbTime}
      playbackId={video.video.asset.playbackId}
      title={video.title}
      {...rest}
    />
  );
};

export default CMSVideo;
