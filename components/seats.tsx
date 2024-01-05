"use client";

import { RoomUser } from "@/models/roomuser";
import { useUser } from "@clerk/nextjs";
import React, { useRef, useEffect } from "react";

type SeatsProps = {
  index: number;
  size: number;
  seatUser: RoomUser | null;
};

const Seats = ({ index, size, seatUser }: SeatsProps) => {
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
        {seatUser && seatUser.username === currentUser?.username ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            className="-scale-x-100 max-w-none h-full"
          />
        ) : null}
      </div>
    </>
  );
};

export default Seats;
