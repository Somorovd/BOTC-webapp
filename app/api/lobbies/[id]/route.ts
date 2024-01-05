import connectMongoDB from "@/libs/mongodb";
import LobbyModel from "@/models/lobby";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectMongoDB();
  const lobby = await LobbyModel.findById(params.id);

  if (!lobby) {
    return Response.json({ message: "Lobby not found" }, { status: 404 });
  }

  return Response.json({ lobby }, { status: 200 });
}
