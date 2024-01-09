import connectMongoDB from "@/libs/mongodb";
import LobbyModel, { Lobby } from "@/models/lobby";
import { RoomUser } from "@/models/roomuser";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { user } = await req.json();

  await connectMongoDB();

  const lobby = (await LobbyModel.findById(params.id)) as Lobby;

  if (!lobby) {
    return Response.json({ message: "Lobby not found" }, { status: 404 });
  }

  if (lobby.users[user.username]) {
    return Response.json({ status: 201 });
  }

  const numUsers = lobby.users.size as unknown as number;
  const newUser: RoomUser = {
    username: user.username,
    seat: numUsers,
  };

  try {
    await LobbyModel.findByIdAndUpdate(params.id, {
      $set: {
        [`users.${newUser.username}`]: newUser,
      },
    });
  } catch (e) {
    console.log("ERROR", e);
    return Response.json({ message: "Error joining lobby" }, { status: 500 });
  }

  return Response.json({ status: 201 });
}
