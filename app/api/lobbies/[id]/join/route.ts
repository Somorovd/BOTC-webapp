import connectMongoDB from "@/libs/mongodb";
import LobbyModel, { Lobby } from "@/models/lobby";
import { RoomUser } from "@/models/roomuser";
import { currentUser } from "@clerk/nextjs";

export async function PUT(req: Request, {params} : {params:{id:string}}) {
    const user = await currentUser();

    if (!user || !user.username) {
        return Response.json({ message: "Unauthorized" }, { status: 403 });
    }

    const firstUser: RoomUser = {
        username: user.username,
    };


    await connectMongoDB();
    const lobby = await LobbyModel.findByIdAndUpdate(
        { _id: params.id },
        { $push: { users: firstUser } },
        { new: true }
        );
    if (!lobby) {
        return Response.json({ message:"not found" }, { status: 404 });
    }

    return Response.json({ lobby }, { status: 201 });
}
