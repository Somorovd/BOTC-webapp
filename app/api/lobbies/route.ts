import connectMongoDB from "@/libs/mongodb";
import Lobby from "@/models/lobby";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const { name } = await req.json();
  const lobby = new Lobby({ name, inviteCode: uuidv4() });

  await connectMongoDB();
  await lobby.save();
  return Response.json({ lobby }, { status: 201 });
}

export async function GET(req: Request) {
  await connectMongoDB();
  const lobbies = await Lobby.find();
  return Response.json({ lobbies }, { status: 200 });
}
