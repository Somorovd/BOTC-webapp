"use client";

import { useLobby } from "@/hooks/use-lobby";
import { RoomUser } from "@/models/roomuser";
import {
  TrackReference,
  VideoTrack,
  useTracks,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import React, { useRef, useEffect } from "react";

type SeatProps = {
  index: number;
  size: number;
  // seatUser: RoomUser | null;
  // videoTrackRef: TrackReference | null;
};

const Seat = ({ index, size /*seatUser, videoTrackRef*/ }: SeatProps) => {
  const user = useLobby((state) => state.lobby?.seats[index]);
  const trackRefs = useTracks([Track.Source.Camera]);

  const track = trackRefs.find(
    (trackRef) => trackRef.participant.identity === user?.username
  );

  return (
    <>
      <p>{user ? user.username : ""}</p>
      <div
        className="rounded-full border-2 border-black flex justify-center items-center overflow-hidden"
        style={{ width: size, height: size }}
      >
        {track && (
          <VideoTrack
            trackRef={track}
            className="h-full max-w-none -scale-x-100"
          />
        )}
      </div>
    </>
  );
};

export default Seat;
