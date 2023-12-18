"use client";

import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRef, useEffect } from "react";

export default function Home() {
  const { user } = useUser();

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
  }, []);

  return (
    <div className="h-full flex flex-col justify-center items-center">
      {user && (
        <div className="flex gap-4">
          <UserButton />
          <p>Welcome, {user?.username}!</p>
        </div>
      )}
      <video ref={videoRef} autoPlay muted className="-scale-x-100 w-fit" />
    </div>
  );
}
