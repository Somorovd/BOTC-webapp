import { VideoTrack, useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import React from "react";

type SeatVideoProps = {
  index: number;
  username?: string;
};

const SeatVideo = ({ index, username }: SeatVideoProps) => {
  const trackRefs = useTracks([Track.Source.Camera]);

  const track = trackRefs.find(
    (trackRef) => trackRef.participant.identity === username
  );

  return (
    <>
      {" "}
      {track && (
        <VideoTrack
          trackRef={track}
          className="h-full max-w-none -scale-x-100"
        />
      )}
    </>
  );
};

export default SeatVideo;
