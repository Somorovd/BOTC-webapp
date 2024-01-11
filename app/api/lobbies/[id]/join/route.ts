import connectMongoDB from "@/libs/mongodb";
import LobbyModel, { Lobby } from "@/models/lobby";
import { RoomUser } from "@/models/roomuser";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { user: joiningUser } = await req.json();

  await connectMongoDB();

  const lobby = (await LobbyModel.findById(params.id)) as Lobby;

  if (!lobby) {
    return Response.json({ message: "Lobby not found" }, { status: 404 });
  }

  const user = lobby.seats.find(
    (user) => user?.username === joiningUser.username
  );

  if (user) {
    return Response.json({ status: 201 });
  }

  let openSeat = -1;
  for (let i = 0; i < lobby.seats.length; i++) {
    if (!lobby.seats[i]) {
      openSeat = i;
      break;
    }
  }

  if (openSeat === -1) {
    return Response.json({ message: "Lobby is full" }, { status: 401 });
  }

  const newUser: RoomUser = {
    username: joiningUser.username,
    seat: openSeat,
  };

  try {
    await LobbyModel.findByIdAndUpdate(params.id, {
      $set: { [`seats.${openSeat}`]: newUser },
    });
  } catch (e) {
    console.log("Error joining lobby: ", e);
    return Response.json({ message: "Error joining lobby" }, { status: 500 });
  }

  return Response.json({ status: 200 });
}
