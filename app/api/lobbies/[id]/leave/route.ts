import connectMongoDB from "@/libs/mongodb";
import LobbyModel, { Lobby } from "@/models/lobby";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { user: leavingUser } = await req.json();

  if (!leavingUser) {
    return Response.json(
      { message: "'user' field is required" },
      { status: 400 }
    );
  }

  await connectMongoDB();

  try {
    await LobbyModel.findByIdAndUpdate(params.id, {
      $set: { [`seats.${leavingUser.seat}`]: null },
    });
  } catch (e) {
    console.log("Error leaving lobby: ", e);
    return Response.json({ message: "Error leaving lobby" }, { status: 500 });
  }

  return Response.json({ status: 200 });
}
