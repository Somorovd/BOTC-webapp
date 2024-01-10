"use client";

import { RoomUser } from "@/models/roomuser";
import { useUser } from "@clerk/nextjs";
import {
  TrackReference,
  TrackReferenceOrPlaceholder,
  VideoTrack,
} from "@livekit/components-react";
import React, { useRef, useEffect } from "react";

type SeatProps = {
  index: number;
  size: number;
  seatUser: RoomUser | null;
  videoTrackRef: TrackReference;
};

const Seat = ({ index, size, seatUser, videoTrackRef }: SeatProps) => {
  const { user: currentUser } = useUser();

  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => console.error("Error accessing media devices:", error));
    return () => {
      // Cleanup function to stop the video stream when the component unmounts
      const stream = videoRef.current?.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <>
      <p>{seatUser ? seatUser.username : ""}</p>
      <div
        className="rounded-full border-2 border-black flex justify-center items-center overflow-hidden"
        style={{ width: size, height: size }}
      >
        {videoTrackRef && (
          <VideoTrack
            trackRef={videoTrackRef}
            className="h-full max-w-none -scale-x-100"
          />
        )}
      </div>
    </>
  );
};

export default Seat;
