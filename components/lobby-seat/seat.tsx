"use client";

import { useLobby } from "@/hooks/use-lobby";
import SeatVideo from "./seat-video";

type SeatProps = {
  index: number;
  size: number;
};

const Seat = ({ index, size }: SeatProps) => {
  const user = useLobby((state) => state.lobby?.seats[index]);

  console.log(`seat rerenders`);

  return (
    <>
      <p>{user ? user.username : ""}</p>
      <div
        className="rounded-full border-2 border-black flex justify-center items-center overflow-hidden"
        style={{ width: size, height: size }}
      >
        <SeatVideo index={index} username={user?.username} />
      </div>
    </>
  );
};

export default Seat;
