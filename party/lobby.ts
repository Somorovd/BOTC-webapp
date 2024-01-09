import { RoomUser } from "@/models/roomuser";
import type * as Party from "partykit/server";

export enum LobbyEvent {
  PlayerJoined = "player-joined",
}

export type EventDataMap = {
  [LobbyEvent.PlayerJoined]: {
    user: RoomUser;
  };
};

export type EventMessage<E extends LobbyEvent> = {
  type: "event";
  event: E;
  data: EventDataMap[E];
};

export default class LobbyServer implements Party.Server {
  constructor(readonly party: Party.Room) {}

  onMessage(message: string, connection: Party.Connection) {
    this.party.broadcast(message, [connection.id]);
  }
}
