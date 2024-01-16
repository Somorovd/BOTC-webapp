"use client";

import { RoomUser } from "@/models/roomuser";
import { useUser } from "@clerk/nextjs";
import React, { useRef, useEffect, useState } from "react";
import {Peer} from 'peerjs'

type SeatsProps = {
  index: number;
  size: number;
  seatUser: RoomUser | null;
};

const Seats = ({ index, size, seatUser }: SeatsProps) => {
  const { user: currentUser } = useUser();
  const [peerId, setPeerId] = useState('null');
  const peerInstance = useRef(null);
  const currentUserVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const test = 'testttttttt';

  useEffect(() => {
    const peer = new Peer(test);
    peer.on('open', function(id) {
    console.log('My peer ID is: ' + id);
    setPeerId(id)
    });
    peer.on('call', (call) => {
      var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      getUserMedia({ video: true, audio: true }, (mediaStream: MediaStream | undefined) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
        call.answer(mediaStream)
        call.on('stream', function(remoteStream) {
          remoteVideoRef.current.srcObject = remoteStream
          remoteVideoRef.current.play();
        });
      });
    })

    peerInstance.current = peer;
    return (() => {
      peer.disconnect()

        // Cleanup or disconnect logic if needed
        peer.destroy();

    })
  },[])

  // const videoRef = useRef<HTMLVideoElement>(null);
  // useEffect(() => {
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true, audio: true })
  //     .then((stream) => {
  //       if (videoRef.current) {
  //         videoRef.current.srcObject = stream;
  //       }
  //     })
  //     .catch((error) => console.error("Error accessing media devices:", error));
  //   return () => {
  //     // Cleanup function to stop the video stream when the component unmounts
  //     const stream = videoRef.current?.srcObject as MediaStream;
  //     if (stream) {
  //       stream.getTracks().forEach((track) => track.stop());
  //     }
  //   };
  // }, []);

  const call = (remotePeerId: any) => {
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true }, (mediaStream: any) => {

      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();

      const call = peerInstance.current.call(remotePeerId, mediaStream)

      call.on('stream', (remoteStream: any) => {
        remoteVideoRef.current.srcObject = remoteStream
        remoteVideoRef.current.play();
      });
    });
  }

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
