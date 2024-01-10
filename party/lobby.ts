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
  private users: Map<string, RoomUser> = new Map();

  constructor(readonly party: Party.Room) {}

  onConnect(connection: Party.Connection) {
    console.log(`${connection.id} connected to ${this.party.id}`);
  }

  onClose(connection: Party.Connection) {
    const eventData: EventDataMap[LobbyEvent.PlayerLeft] = {
      user: this.users.get(connection.id)!,
    };
    const msg: EventMessage<LobbyEvent.PlayerLeft> = {
      type: "event",
      event: LobbyEvent.PlayerLeft,
      data: eventData,
    };
    console.log("Player Left: ", eventData.user.username);
    this.party.broadcast(JSON.stringify(msg), [connection.id]);
  }

  onMessage(message: string, connection: Party.Connection) {
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
