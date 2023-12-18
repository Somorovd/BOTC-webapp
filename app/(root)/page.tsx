"use client";

import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();
  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex gap-4">
        <UserButton />
        <p>Welcome, {user?.username}!</p>
      </div>
    </div>
  );
}
