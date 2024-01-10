import connectMongoDB from "@/libs/mongodb";
import LobbyModel from "@/models/lobby";
import { RoomUser } from "@/models/roomuser";
import { currentUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const { name, maxUsers } = await req.json();
  const user = await currentUser();

  if (!user || !user.username) {
    return Response.json({ message: "Unauthorized" }, { status: 403 });
  }

  const firstUser: RoomUser = {
    username: user.username,
    seat: 0,
  };

  const lobby = new LobbyModel({
    name,
    maxUsers: Number(maxUsers),
    numCurrentUsers: 1,
    inviteCode: uuidv4(),
    seats: [firstUser, ...new Array(Number(maxUsers) - 1).fill(null)],
  });

  await connectMongoDB();
  await lobby.save();
  return Response.json({ lobby }, { status: 201 });
}

export async function GET(req: Request) {
  await connectMongoDB();
  const lobbies = await LobbyModel.find();
  return Response.json({ lobbies }, { status: 200 });
}
