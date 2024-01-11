import { RoomUser } from "@/models/roomuser";
import type * as Party from "partykit/server";

export enum LobbyEvent {
  PlayerJoined = "player-joined",
  PlayerLeft = "player-left",
}

export type EventDataMap = {
  [LobbyEvent.PlayerJoined]: {
    user: RoomUser;
  };
  [LobbyEvent.PlayerLeft]: {
    user: RoomUser;
  };
};

export type EventMessage<E extends LobbyEvent> = {
  type: "event";
  event: E;
  data: EventDataMap[E];
};

export default class LobbyServer implements Party.Server {
  private users!: Map<string, RoomUser>;

  constructor(readonly party: Party.Room) {
    this.users = new Map();
  }

  onConnect(connection: Party.Connection) {
    console.log(`${connection.id} connected to ${this.party.id}`);
  }

  async onClose(connection: Party.Connection) {
    const user = this.users.get(connection.id)!;
    const eventData: EventDataMap[LobbyEvent.PlayerLeft] = {
      user,
    };
    const msg: EventMessage<LobbyEvent.PlayerLeft> = {
      type: "event",
      event: LobbyEvent.PlayerLeft,
      data: eventData,
    };
    console.log("Player Left: ", user.username);

    await fetch(
      `${this.party.env.NEXT_PUBLIC_URL}/api/lobbies/${this.party.id}/leave`,
      {
        method: "put",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ user }),
      }
    );

    this.party.broadcast(JSON.stringify(msg), [connection.id]);
  }

  async onMessage(message: string, connection: Party.Connection) {
    const msg: EventMessage<any> = JSON.parse(message);

    if (msg.event === LobbyEvent.PlayerJoined) {
      const { user } = msg.data as EventDataMap[LobbyEvent.PlayerJoined];
      this.users.set(connection.id, user);

      console.log("Player Joined: ");
      console.log(this.users);
    }

    this.party.broadcast(message, [connection.id]);
  }
}
