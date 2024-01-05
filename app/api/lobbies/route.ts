import connectMongoDB from "@/libs/mongodb";
import LobbyModel from "@/models/lobby";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const { name, maxUsers } = await req.json();
  const lobby = new LobbyModel({
    name,
    maxUsers: Number(maxUsers),
    inviteCode: uuidv4(),
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
